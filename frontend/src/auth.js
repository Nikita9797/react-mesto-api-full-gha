export const BASE_URL = "http://localhost:3000";

export const register = (password, email) => {
  console.log({ password, email });
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => {
    console.log(response);
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

export const checkToken = () => {
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
