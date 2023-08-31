import React from "react";
import "./PopupWithForm.css";
import popupCloseIcon from "../images/close-icon.svg";

function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  children,
  onSubmit,
  buttonText,
}) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <h2 className="popup__text">{title}</h2>
        <form className="popup__inputs" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
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

export default PopupWithForm;
