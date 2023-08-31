import React from "react";
import "./Card.css";
import cardTrashIcon from "../images/trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const userContext = React.useContext(CurrentUserContext);
  const currentCardId = userContext._id;
  const isOwn = card.owner === currentCardId;
  const isLiked = card.likes.some((item) => item === userContext._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <div
        style={{ backgroundImage: `url(${card.link})` }}
        className="card__image"
        onClick={handleClick}
      ></div>
      {isOwn && (
        <img
          src={cardTrashIcon}
          alt="Иконка для удаления карточки"
          className="card__trash"
          onClick={handleDeleteClick}
        />
      )}
      <div className="card__flex-row">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__like-flex">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
