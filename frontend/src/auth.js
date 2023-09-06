export const BASE_URL = "https://mestosprint15backend.nomoredomainsicu.ru";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`${response.status}`);
  });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`${response.status}`);
  });
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`${response.status}`);
  })
};

export const clearCookies = () => {
  return fetch(`${BASE_URL}/signout`, {
    credentials: "include",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
};
