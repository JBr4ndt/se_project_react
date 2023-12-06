import { NavLink } from "react-router-dom";
import "../blocks/Header.css";
import logoPath from "../images/logo.svg";
import ToggleSwitch from "./ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Header = ({ onCreateModal, onRegister, onLogin, isLoggedIn, city }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);
  const name = currentUser?.data.name;
  const avatar = currentUser?.data.avatar;
  const currentAvatar = avatar !== "" ? true : false;

  return (
    <header className="header">
      <div className="header__container">
        <NavLink exact to="/">
          <img
            src={logoPath}
            alt="What to wear logo"
            className="header__logo"
          />
        </NavLink>

        <p className="header__date">
          {currentDate}, {city}
        </p>
      </div>
      <div className="header__nav">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              type="text"
              className="header__button"
              onClick={onCreateModal}
            >
              + Add clothes
            </button>
            <NavLink to="/profile" className="header__link">
              <p className="header__name">{name}</p>
            </NavLink>
            {currentAvatar ? (
              <img src={avatar} alt="Avatar" className="header__avatar" />
            ) : (
              <div className="header__avatar"> {name[0]?.toUpperCase()} </div>
            )}
          </>
        ) : (
          <>
            <button type="text" className="header__button" onClick={onRegister}>
              Sign Up
            </button>
            <button type="text" className="header__button" onClick={onLogin}>
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
