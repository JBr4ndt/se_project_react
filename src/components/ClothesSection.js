import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

const ClothesSection = ({ onSelectCard, onCreateModal, clothingItems }) => {
  return (
    <div className="clothes">
      <div className="clothes__container">
        <h3 className="clothes__title">Your items</h3>
        <button
          className="clothes__add-button"
          type="text"
          onClick={onCreateModal}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes__gallery">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item.id} item={item} onSelectCard={onSelectCard} />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
