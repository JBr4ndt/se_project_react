import "../blocks/ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card">
      <div className="card__container">
        <img
          className="card__image"
          src={item.link || item.imageUrl}
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
      </div>
      <div className="card__name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
