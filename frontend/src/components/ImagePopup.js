import React from "react";
import "./ImagePopup.css";
import popupCloseIcon from "../images/close-icon.svg";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup-image ${card && "popup-image_opened"}`}>
      <div className="popup__content">
        <img
          className="popup__image"
          src={card ? card.link : "#"}
          alt={card && card.name}
        />
        <h2 className="popup__sub-text">{card && card.name}</h2>
        <button onClick={onClose} className="popup__close-button" type="button">
          <img
            className="popup__close-icon"
            src={popupCloseIcon}
            alt="Иконка для закрытия попапа"
          />
        </button>
      </div>
    </div>
  );
}

export default ImagePopup;
