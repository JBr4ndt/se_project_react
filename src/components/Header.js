import { NavLink } from "react-router-dom";
import "../blocks/Header.css";
import logoPath from "../images/logo.svg";
import avatarPath from "../images/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";

const Header = ({ onCreateModal, city }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
        <button type="text" className="header__button" onClick={onCreateModal}>
          + Add clothes
        </button>
        <NavLink to="/profile" className="header__link">
          <p className="header__name">Jonathan Brandt</p>
        </NavLink>

        <img src={avatarPath} alt="Avatar" className="header__avatar" />
      </div>
    </header>
  );
};

export default Header;
