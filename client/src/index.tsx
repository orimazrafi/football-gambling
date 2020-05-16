import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Auth from "./auth";
import store from "./redux/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("./firebase-messaging-sw.js")
//     .then(function (registration) {
//       console.log("Registration successful, scope is:", registration.scope);
//     })
//     .catch(function (err) {
//       console.log("Service worker registration failed, error:", err);
//     });
// }

const auth = new Auth();
declare global {
  interface Window {
    setState: (changes: { email: string; name: string; auth: any }) => void;
  }
}

let state = {};
window.setState = (changes) => {
  state = Object.assign({}, state, changes);
  ReactDOM.render(
    <Provider store={store}>
      <App {...state} />
    </Provider>,
    document.getElementById("root")
  );
};

/* eslint no-restricted-globals: 0*/
let name = auth.getProfile().name;
let image = auth.getProfile().picture;
let email = auth.getProfile().email;

let initialState = {
  email,
  name,
  auth,
  image,
};

window.setState(initialState);
serviceWorker.register();
