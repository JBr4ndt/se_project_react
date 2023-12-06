import "../blocks/ItemModal.css";
import closeButtonPath from "../images/closeButton.svg";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, openConfirmationModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const userInfo = currentUser ? currentUser : "";
  const isOwn = selectedCard.owner === userInfo?._id;
  const modalDeleteButtonClassName = `modal__button-delete ${
    isOwn ? "modal__button-delete_visible" : "modal__button-delete_hidden"
  }`;

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
          className={modalDeleteButtonClassName}
          onClick={openConfirmationModal}
        >
          Delete item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
