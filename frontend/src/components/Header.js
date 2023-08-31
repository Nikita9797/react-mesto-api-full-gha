import React from "react";
import "./Header.css";
import headerLogo from "../images/logo.svg";
import { useLocation, Link } from "react-router-dom";

function Header({ email, signOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__flex">
        <img className="logo" src={headerLogo} alt="Логотип" />
        <div className="header-info__flex">
          {location.pathname === "/sign-in" ? (
            <Link to="/sign-up" className="header__button">
              Регистрация
            </Link>
          ) : location.pathname === "/sign-up" ? (
            <Link to="/sign-in" className="header__button">
              Войти
            </Link>
          ) : (
            <>
              <p className="header__email">{email}</p>
              <p className="header__button" onClick={signOut}>
                Выйти
              </p>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
