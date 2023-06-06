import "../blocks/ModalWithForm.css";
import closeButtonPath from "../images/closeButton.svg";

const ModalWithForm = ({ children, buttonText, title, onClose, name }) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button type="button" onClick={onClose} className="modal__button-close">
          <img src={closeButtonPath} alt="Close button" />
        </button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form">{children}</form>
        <button type="submit" className="modal__button-submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
