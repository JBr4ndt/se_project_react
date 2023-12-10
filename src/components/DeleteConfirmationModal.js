import closeButtonPath from "../images/closeButton.svg";
import "../blocks/DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({
  onClose,
  selectedCard,
  onCardDelete,
  isLoading,
}) => {
  console.log(selectedCard);
  const handleDeleteItem = () => {
    onCardDelete(selectedCard);
  };

  return (
    <div className="modal modal_type_confirmation">
      <div className="modal__confirmation-content">
        <button type="button" onClick={onClose} className="modal__button-close">
          <img src={closeButtonPath} alt="Close button" />
        </button>
        <div className="modal__confirmation-texts">
          <p className="modal__confirmation-text">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__confirmation-text">
            This action is irreversible.
          </p>
        </div>
        <button
          className="modal__confirmation-button-delete"
          type="text"
          onClick={handleDeleteItem}
        >
          {isLoading ? "Saving..." : "Yes, delete item"}
        </button>
        <button
          className="modal__confirmation-button-cancel"
          type="text"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
