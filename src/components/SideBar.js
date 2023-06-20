import "../blocks/SideBar.css";
import avatarPath from "../images/avatar.svg";

const SideBar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar__menu">
        <li className="sidebar__user">
          <img src={avatarPath} alt="Avatar" className="sidebar__user-avatar" />
          <p className="sidebar__user-name">Jonathan Brandt</p>
        </li>
      </nav>
    </aside>
  );
};

export default SideBar;
