import React from "react";
import "./InfoTooltip.css";
import popupCloseIcon from "../images/close-icon.svg";
import imgOk from "../images/ok.svg";
import imgErr from "../images/error.svg";

function InfoTooltip({ isOpen, onClose, message }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__massage-container">
        <img
          src={message.status ? imgOk : imgErr}
          alt={
            message.status
              ? "Иконка об успешной регистрации"
              : "Иконка с ошибкой"
          }
          className="popup__icon-image"
        ></img>
        <h2 className="popup__icon-text">{message.text}</h2>
        <button className="popup__close-button" type="button" onClick={onClose}>
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

export default InfoTooltip;
