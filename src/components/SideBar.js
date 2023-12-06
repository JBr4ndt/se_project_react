import "../blocks/SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const SideBar = ({ openChangeProfile, onLogOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const name = currentUser?.data.name;
  const avatar = currentUser?.data.avatar;
  const currentAvatar = avatar !== "" ? true : false;
  //test no avatar profile
  return (
    <aside className="sidebar">
      <nav className="sidebar__menu">
        <li className="sidebar__user">
          {currentAvatar ? (
            <img src={avatar} alt="Avatar" className="sidebar__user-avatar" />
          ) : (
            <div className="sidebar__user-avatar">{name[0]?.toUpperCase()}</div>
          )}

          <p className="sidebar__user-name">{name}</p>
        </li>
        <div className="sidebar__user-controller">
          <button
            type="button"
            className="sidebar__user-controller-button"
            onClick={openChangeProfile}
          >
            Change profile data
          </button>
          <button
            type="button"
            className="sidebar__user-controller-button"
            onClick={onLogOut}
          >
            Log out
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
