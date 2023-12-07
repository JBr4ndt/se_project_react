import ModalWithForm from "./ModalWithForm";
import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, isLoading, onChangeProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  useEffect(() => {
    setName(currentUser.name);
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangeProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          value={name}
          required
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label">
        Avatar
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          required
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
