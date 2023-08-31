import React from "react";
import "./Login.css";
import AuthForm from "./AuthForm";
import PopupInput from "./PopupInput";

function Login({ onLogin }) {
  const [formValue, setFormValue] = React.useState({
    username: "",
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
    onLogin(formValue);
  };

  return (
    <section className="auth">
      <AuthForm
        onSubmit={handleSubmit}
        title="Вход"
        name="login-form"
        buttonText="Войти"
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
    </section>
  );
}

export default Login;
