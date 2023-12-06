import ModalWithForm from "./ModalWithForm";
import { useEffect, useState } from "react";

const LoginModal = ({ onClose, onLogin, isOpen, isLoading, openRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText={isLoading ? "Wait..." : "Log in"}
      onClose={onClose}
      onSubmit={handleSubmit}
      shiftButtonText="or Register"
      shiftOpenModal={openRegister}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
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
        Password
        <input
          type="password"
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
    </ModalWithForm>
  );
};

export default LoginModal;
