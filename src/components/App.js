import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import Profile from "./Profile";
import AddItemModal from "./AddItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import api from "../utils/api";
import { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/auth";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import EditProfileModal from "./EditProfileModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleOpenConfirmationModal = () => {
    setActiveModal("confirm");
  };
  const handleOpenRegisterModal = () => {
    setActiveModal("register");
  };
  const handleOpenLoginModal = () => {
    setActiveModal("login");
  };
  const handleOpenEditProfileModal = () => {
    setActiveModal("editProfile");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(() => {
        handleCloseModal();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleRegisterSubmit = (user) => {
    setIsLoading(true);
    return auth
      .register(user)
      .then((newUser) => {
        console.log(newUser);
        setCurrentUser(newUser);
        setIsLoggedIn(true);
        localStorage.setItem("jwt", newUser.token);
        handleCloseModal();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleLoginSubmit = (userInfo) => {
    return auth
      .authorize(userInfo)
      .then((res) => {
        const token = res.token;
        localStorage.setItem("jwt", token);
        return auth.getContent(token).then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          handleCloseModal();
          history.push("/profile");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProfileChanges = (userInfo) => {
    const editProfileRequest = () => {
      return auth.editProfile(userInfo).then((res) => {
        setCurrentUser(res.userInfo);
      });
    };
    handleSubmit(editProfileRequest);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
    history.push("/");
  };

  const handleAddItemSubmit = (item) => {
    const addItemRequest = () => {
      return api.addItem(item).then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
      });
    };
    handleSubmit(addItemRequest);
  };
  //changed id to selectedCard
  const handleCardDelete = (selectedCard) => {
    const cardDeleteRequest = () => {
      return api.removeItem(selectedCard._id).then(() => {
        const filteredCards = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(filteredCards);
      });
    };
    handleSubmit(cardDeleteRequest);
  };
  //add owner to likes
  const handleLikeClick = ({ id, isLiked }) => {
    console.log(id, isLiked);
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch(console.error)
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch(console.error);
  };

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

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

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
            history.push("/profile");
            console.log("you're in");
          }
        })
        .catch((err) => console.log(err));
    } else {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      history.push("/");
      console.log("you're out");
    }
  }, [isLoggedIn, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__wrapper">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              onCreateModal={handleCreateModal}
              onRegister={handleOpenRegisterModal}
              onLogin={handleOpenLoginModal}
              isLoggedIn={isLoggedIn}
              city={city}
            />
            <Switch>
              <Route exact path="/">
                <Main
                  weatherTemp={temp}
                  onSelectCard={handleSelectedCard}
                  clothingItems={clothingItems}
                  onCardLike={handleLikeClick}
                  isLoggedIn={isLoggedIn}
                />
              </Route>
              <ProtectedRoute isLoggedIn={isLoggedIn} exact path={"/profile"}>
                <Profile
                  onSelectCard={handleSelectedCard}
                  onCreateModal={handleCreateModal}
                  clothingItems={clothingItems}
                  openChangeProfile={handleOpenEditProfileModal}
                  onCardLike={handleLikeClick}
                  onLogOut={handleLogOut}
                  isLoggedIn={isLoggedIn}
                />
              </ProtectedRoute>
              <Route path="/">
                {isLoggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
              </Route>
            </Switch>

            <Footer />
            {activeModal === "create" && (
              <AddItemModal
                onClose={handleCloseModal}
                isOpen={activeModal === "create"}
                onAddItem={handleAddItemSubmit}
                isLoading={isLoading}
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
                isLoading={isLoading}
              />
            )}
            {activeModal === "register" && (
              <RegisterModal
                onClose={handleCloseModal}
                onRegister={handleRegisterSubmit}
                isOpen={activeModal === "register"}
                isLoading={isLoading}
                openLogin={handleOpenLoginModal}
              />
            )}
            {activeModal === "login" && (
              <LoginModal
                onClose={handleCloseModal}
                onLogin={handleLoginSubmit}
                isOpen={activeModal === "login"}
                isLoading={isLoading}
                openRegister={handleOpenRegisterModal}
              />
            )}
            {activeModal === "editProfile" && (
              <EditProfileModal
                onClose={handleCloseModal}
                onChangeProfile={handleProfileChanges}
                isOpen={activeModal === "editProfile"}
                isLoading={isLoading}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
