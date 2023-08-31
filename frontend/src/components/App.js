import React from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/Api";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import { register, authorize, checkToken, clearCookies } from "../auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [registerMessage, setRegisterMessage] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [headerEmail, setHeaderEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsRegisterPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (isLiked) {
      api
        .likeCardDelete(card._id)
        .then((res) => {
          setCards((cards) =>
            cards.map((item) => (item._id === card._id ? res : item))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .likeCard(card._id)
        .then((res) => {
          setCards((cards) =>
            cards.map((item) => (item._id === card._id ? res : item))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(info) {
    console.log(info);
    api
      .setUserInfo(info.name, info.about)
      .then((res) => {
        setCurrentUser(res.user);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(info) {
    api
      .setAvatar(info.avatar)
      .then((res) => {
        setCurrentUser(res.user);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data.name, data.link)
      .then((res) => {
        setCards([...cards, res]);

        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(data) {
    console.log(data);
    authorize(data.password, data.email)
      .then((res) => {
        setLoggedIn(true);
        setHeaderEmail(data.email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        if (err === "400") {
          setRegisterMessage({
            status: false,
            text: "Не передано одно из полей",
          });
        } else {
          setRegisterMessage({
            status: false,
            text: "Пользователь с email не найден",
          });
        }
        setIsRegisterPopupOpen(true);
      });
  }

  function handRegister(data) {
    console.log(data);
    register(data.password, data.email)
      .then(() => {
        setRegisterMessage({
          status: true,
          text: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        setRegisterMessage({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setIsRegisterPopupOpen(true);
      });
  }

  const handleTokenCheck = () => {
    checkToken()
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        setHeaderEmail(res.email);
        navigate("/", { replace: true });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  function signOut() {
    clearCookies()
    .then(() => {
      navigate("/sign-in", { replace: true })
      setLoggedIn(false);
    })
    .catch((err) => {
      console.log(err)
    });
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header email={headerEmail} signOut={signOut} />
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/main" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/main"
              element={
                <ProtectedRouteElement
                  element={Main}
                  onEditProfile={() => handleEditProfileClick()}
                  onAddPlace={() => handleAddPlaceClick()}
                  onEditAvatar={() => handleEditAvatarClick()}
                  onCardClick={(card) => handleCardClick(card)}
                  onCardLike={(card) => handleCardLike(card)}
                  onCardDelete={(card) => handleCardDelete(card)}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onRegister={(data) => handRegister(data)} />}
            />
            <Route
              path="/sign-in"
              element={<Login onLogin={(data) => handleLogin(data)} />}
            />
          </Routes>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={(info) => handleUpdateUser(info)}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={(info) => handleAddPlaceSubmit(info)}
        />

        <ImagePopup card={selectedCard} onClose={() => closeAllPopups()} />
        <PopupWithForm
          title="Вы уверены?"
          name="delete-card-form"
          onClose={() => closeAllPopups()}
          buttonText="Да"
        ></PopupWithForm>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={(info) => handleUpdateAvatar(info)}
        />

        <InfoTooltip
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          message={registerMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
