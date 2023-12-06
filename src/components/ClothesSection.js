import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ClothesSection = ({
  onSelectCard,
  onCreateModal,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const itemsOwned = clothingItems.filter((item) => {
    return item?.owner === currentUser?.data._id;
  });

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
        {itemsOwned.map((item) => {
          return (
            <ItemCard
              key={item.id || item._id}
              item={item}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
