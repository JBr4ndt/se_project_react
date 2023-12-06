import "../blocks/ModalWithForm.css";
import closeButtonPath from "../images/closeButton.svg";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  name,
  onSubmit,
  shiftButtonText,
  shiftOpenModal,
}) => {
  const handleShiftButton = () => {
    onClose();
    shiftOpenModal();
  };

  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button type="button" onClick={onClose} className="modal__button-close">
          <img src={closeButtonPath} alt="Close button" />
        </button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__button-submit">
            {buttonText}
          </button>
          {shiftButtonText && (
            <button
              type="button"
              onClick={handleShiftButton}
              className="modal__button-shift"
            >
              {shiftButtonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
