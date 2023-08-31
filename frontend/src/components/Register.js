import React from "react";
import "./Register.css";
import AuthForm from "./AuthForm";
import PopupInput from "./PopupInput";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue);
  };

  return (
    <section className="auth">
      <AuthForm
        title="Регистрация"
        name="login-form"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <PopupInput
          onChange={handleChange}
          type="email"
          name="email"
          id="email-input"
          placeholder="Email"
          darkTheme={true}
        />
        <PopupInput
          onChange={handleChange}
          type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          darkTheme={true}
        />
      </AuthForm>
      <Link to="/sign-in" className="register__link">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;
