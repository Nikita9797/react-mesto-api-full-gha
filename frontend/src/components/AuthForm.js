import React from "react";
import "./AuthForm.css";

function AuthForm({ title, name, buttonText, children, onSubmit }) {
  return (
    <>
      <h2 className="auth__text">{title}</h2>
      <form className="auth__inputs" name={name} onSubmit={onSubmit}>
        {children}
        <button type="submit" className="auth__button">
          {buttonText}
        </button>
      </form>
    </>
  );
}

export default AuthForm;
