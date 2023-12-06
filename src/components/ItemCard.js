import "../blocks/ItemCard.css";
import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import likeOffPath from "../images/likeButtonOff.svg";
import likeOnPath from "../images/likeButtonOn.svg";

const ItemCard = ({ item, onSelectCard, onCardLike, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item?.likes.some((id) => id === currentUser?._id);
  const likeButtonClassName = `card__like-button ${
    !isLoggedIn && "card__like-button-hidden"
  }`;
  /*const likeButtonClassName= isLiked
    ? "card__like-button card__like-button-active"
    : "card__like-button ";*/
  const likeButtonPath = isLiked ? likeOnPath : likeOffPath;

  const handleLikeClick = (e) => {
    e.preventDefault();
    onCardLike({ id: item?._id, isLiked });
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
        <img
          alt="like button"
          className={likeButtonClassName}
          src={likeButtonPath}
          onClick={handleLikeClick}
        />
      </div>
    </div>
  );
};

export default ItemCard;
