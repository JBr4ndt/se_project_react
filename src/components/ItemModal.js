import "../blocks/ItemModal.css";
import closeButtonPath from "../images/closeButton.svg";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className="item__modal">
      <div className="item__modal-content">
        <button type="button" onClick={onClose} className="modal__button-close">
          <img src={closeButtonPath} alt="Close button" />
        </button>
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="item__modal-image"
        />
        <p className="item__modal-name">{selectedCard.name}</p>
        <p className="item__modal-info">Weather: {selectedCard.weather}</p>
      </div>
    </div>
  );
};

export default ItemModal;
