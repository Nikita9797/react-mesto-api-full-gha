import React from "react";
import PopupWithForm from "./PopupWithForm";
import PopupInput from "./PopupInput";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleName(evt) {
    setName(evt.target.value);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser && currentUser.name);
    setDescription(currentUser && currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="user-info-form"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <PopupInput
        onChange={handleName}
        minLength="2"
        maxLength="40"
        type="text"
        name="name"
        id="name-input"
        value={name ? name : ""}
        placeholder="Введите имя"
      />
      <PopupInput
        onChange={handleDescription}
        minLength="2"
        maxLength="200"
        type="text"
        name="status"
        id="status-input"
        value={description ? description : ""}
        placeholder="Введите профессию"
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
