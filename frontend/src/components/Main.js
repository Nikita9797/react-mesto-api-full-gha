import React from "react";
import "./Main.css";
import profilePenIcon from "../images/pen.svg";
import addButtonPlusIcon from "../images/plus.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const userContext = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile content__profile">
        <div
          className="profile__image"
          onClick={onEditAvatar}
          style={{
            backgroundImage: `url(${userContext && userContext.avatar})`,
          }}
        >
          <div className="profile__overlay"></div>
        </div>
        <div className="profile__info">
          <div className="profile__info-row">
            <h1 className="profile__name">{userContext && userContext.name}</h1>
            <button
              className="profile__edit-button"
              onClick={onEditProfile}
              type="button"
            >
              <img
                className="profile__pen-icon"
                src={profilePenIcon}
                alt="Иконка редактирования"
              />
            </button>
          </div>
          <p className="profile__status">{userContext && userContext.about}</p>
        </div>
        <button className="add-button" onClick={onAddPlace} type="button">
          <img
            className="add-button__plus-icon"
            src={addButtonPlusIcon}
            alt="Иконка плюс"
          />
        </button>
      </section>
      <section className="gallery">
        <ul className="cards">
          {cards &&
            cards.map((item) => (
              <Card
                card={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                key={item._id}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
