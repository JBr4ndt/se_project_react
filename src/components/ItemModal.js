import "../blocks/ItemModal.css";
import closeButtonPath from "../images/closeButton.svg";

const ItemModal = ({ selectedCard, onClose, openConfirmationModal }) => {
  return (
    <div className="item__modal">
      <div className="item__modal-content">
        <button type="button" onClick={onClose} className="modal__button-close">
          <img src={closeButtonPath} alt="Close button" />
        </button>
        <img
          src={selectedCard.link || selectedCard.imageUrl}
          alt={selectedCard.name}
          className="item__modal-image"
        />
        <p className="item__modal-name">{selectedCard.name}</p>
        <p className="item__modal-info">Weather: {selectedCard.weather}</p>
        <button
          type="text"
          className="modal__button-delete"
          onClick={openConfirmationModal}
        >
          Delete item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
