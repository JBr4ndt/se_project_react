import "../blocks/Header.css";
import logoPath from "../images/logo.svg";
import avatarPath from "../images/avatar.svg";

const Header = ({ onCreateModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <img src={logoPath} alt="What to wear logo" className="header__logo" />
        <p className="header__date">{currentDate}, Portland</p>
      </div>
      <div className="header__nav">
        <button type="text" className="header__button" onClick={onCreateModal}>
          + Add clothes
        </button>
        <p className="header__name">Jonathan Brandt</p>
        <img src={avatarPath} alt="Avatar" className="header__avatar" />
      </div>
    </header>
  );
};

export default Header;
