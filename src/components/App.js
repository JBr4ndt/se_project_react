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
import {
  getItemList,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
} from "../utils/api";
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
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleRegisterSubmit = ({ email, password, name, avatar }) => {
    const registerRequest = () => {
      return auth
        .register({ email, password, name, avatar })
        .then((newUser) => {
          console.log(newUser);
          handleLoginSubmit({ email, password });
        });
    };
    handleSubmit(registerRequest);
  };

  const handleLoginSubmit = ({ email, password }) => {
    const loginRequest = () => {
      return auth.authorize({ email, password }).then((res) => {
        const token = res.token;
        localStorage.setItem("jwt", token);
        return auth.getContent(token).then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          history.push("/profile");
        });
      });
    };
    handleSubmit(loginRequest);
  };

  const handleProfileChanges = ({ name, avatar }) => {
    const editProfileRequest = () => {
      return auth.editProfile({ name, avatar }).then(setCurrentUser);
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
      return addItem(item).then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
      });
    };
    handleSubmit(addItemRequest);
  };

  const handleCardDelete = (selectedCard) => {
    const cardDeleteRequest = () => {
      return removeItem(selectedCard._id).then(() => {
        const filteredCards = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(filteredCards);
      });
    };
    handleSubmit(cardDeleteRequest);
  };

  const handleLikeClick = ({ id, isLiked }) => {
    console.log(id, isLiked);
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch(console.error)
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch(console.error);
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

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
    getItemList()
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
                //isOpen={activeModal === "editProfile"}
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
