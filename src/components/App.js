import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import { useEffect, useState } from "react";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

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

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header onCreateModal={handleCreateModal} />
        <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm
            title="New garment"
            buttonText="Add garment"
            onClose={handleCloseModal}
          >
            <label className="modal__label">
              Name
              <input
                type="text"
                name="name"
                className="modal__input"
                placeholder="Name"
                minLength="2"
                maxLength="30"
                required
              />
            </label>
            <label className="modal__label">
              Image
              <input
                type="url"
                name="link"
                className="modal__input"
                placeholder="Image URL"
                required
              />
            </label>
            <p>Select the weather type</p>
            <div className="modal__radio-buttons">
              <div className="modal__radio-button">
                <input
                  className="modal__radio-input"
                  type="radio"
                  id="hot"
                  value="hot"
                />
                <label>Hot</label>
              </div>
              <div className="modal__radio-button">
                <input
                  className="modal__radio-input"
                  type="radio"
                  id="warm"
                  value="warm"
                />
                <label>Warm</label>
              </div>
              <div className="modal__radio-button">
                <input
                  className="modal__radio-input"
                  type="radio"
                  id="cold"
                  value="cold"
                />
                <label>Cold</label>
              </div>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default App;
