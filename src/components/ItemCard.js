import "../blocks/ItemCard.css";
import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardLike, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const cardId = item?._id;
  const userId = currentUser?.data._id;
  const isLiked = item?.likes.some((id) => id === userId);
  const likeButtonClassName = isLiked
    ? "card__like-button card__like-button-active"
    : "card__like-button ";
  //add owner
  const handleLikeClick = (e) => {
    e.preventDefault();
    onCardLike({ id: cardId, isLiked });
  };

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
      <div className="card__info">
        <div className="card__name">{item.name}</div>
        {isLoggedIn ? (
          <button
            type="button"
            className={likeButtonClassName}
            onClick={handleLikeClick}
          />
        ) : (
          <button type="button" className="card__like-button-hidden" />
        )}
      </div>
    </div>
  );
};

export default ItemCard;
