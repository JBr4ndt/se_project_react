import ModalWithForm from "./ModalWithForm";
import "../blocks/AddItemModal.css";
import { useEffect, useState } from "react";

const AddItemModal = ({ onClose, onAddItem, isOpen, isLoading }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
      setWeather("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl: link, weather });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
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
        Image
        <input
          type="url"
          name="link"
          className="modal__input"
          placeholder="Image URL"
          value={link}
          required
          onChange={handleLinkChange}
        />
      </label>
      <p>Select the weather type</p>
      <div className="modal__radio-buttons">
        <div className="modal__radio-button">
          <input
            className="modal__radio-input"
            type="radio"
            id="hot"
            value="hot"
            onChange={handleWeatherChange}
          />
          <label htmlFor="hot">Hot</label>
        </div>
        <div className="modal__radio-button">
          <input
            className="modal__radio-input"
            type="radio"
            id="warm"
            value="warm"
            onChange={handleWeatherChange}
          />
          <label htmlFor="warm">Warm</label>
        </div>
        <div className="modal__radio-button">
          <input
            className="modal__radio-input"
            type="radio"
            id="cold"
            value="cold"
            onChange={handleWeatherChange}
          />
          <label htmlFor="cold">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
