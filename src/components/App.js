import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import Profile from "./Profile";
import AddItemModal from "./AddItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleOpenConfirmationModal = () => {
    setActiveModal("confirm");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = (item) => {
    api
      .addItem(item)
      .then((newItem) => {
        console.log(newItem);
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (id) => {
    api
      .removeItem(id)
      .then(() => {
        const filteredCards = clothingItems.filter((item) => {
          return item.id !== id;
        });
        setClothingItems(filteredCards);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data).temperature;
        const cityName = parseWeatherData(data).cityName;
        setTemp(temperature);
        setCity(cityName);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    api
      .getItemList()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page">
      <div className="page__wrapper">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header onCreateModal={handleCreateModal} city={city} />
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
              />
            </Route>
            <Route path="/profile">
              <Profile
                onSelectCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
                clothingItems={clothingItems}
              />
            </Route>
          </Switch>

          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              onClose={handleCloseModal}
              isOpen={activeModal === "create"}
              onAddItem={handleAddItemSubmit}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              openConfirmationModal={handleOpenConfirmationModal}
            />
          )}
          {activeModal === "confirm" && (
            <DeleteConfirmationModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              onCardDelete={handleCardDelete}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
