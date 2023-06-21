import closeButtonPath from "../images/closeButton.svg";
import "../blocks/DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({
  onClose,
  selectedCard,
  onCardDelete,
  isLoading,
}) => {
  const handleDeleteItem = () => {
    onCardDelete(selectedCard.id);
  };

  return (
    <div className="confirmation__modal">
      <div className="confirmation__modal-content">
        <button type="button" onClick={onClose} className="modal__button-close">
          <img src={closeButtonPath} alt="Close button" />
        </button>
        <div className="confirmation__texts">
          <p className="confirmation__text">
            Are you sure you want to delete this item?
          </p>
          <p className="confirmation__text">This action is irreversible.</p>
        </div>
        <button
          className="confirmation__button-delete"
          type="text"
          onClick={handleDeleteItem}
        >
          {isLoading ? "Saving..." : "Yes, delete item"}
        </button>
        <button
          className="confirmation__button-cancel"
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
