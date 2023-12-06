import ModalWithForm from "./ModalWithForm";
import { useEffect, useState } from "react";

const RegisterModal = ({
  onClose,
  onRegister,
  isOpen,
  isLoading,
  openLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
    }
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password, name, avatar });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Saving..." : "Next"}
      onClose={onClose}
      onSubmit={handleSubmit}
      shiftButtonText="or Log in"
      shiftOpenModal={openLogin}
    >
      <label className="modal__label">
        Email*
        <input
          type="text"
          name="email"
          className="modal__input"
          placeholder="Email"
          minLength="2"
          maxLength="30"
          value={email}
          required
          onChange={handleEmailChange}
        />
      </label>
      <label className="modal__label">
        Password*
        <input
          type="text"
          name="password"
          className="modal__input"
          placeholder="Password"
          minLength="2"
          maxLength="30"
          value={password}
          required
          onChange={handlePasswordChange}
        />
      </label>
      <label className="modal__label">
        Name
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
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Image URL"
          value={avatar}
          required
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
