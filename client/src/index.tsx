import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Auth from "./auth";
import "./index.css";

const auth = new Auth();
declare global {
  interface Window {
    setState: (changes: { name: string; auth: any }) => void;
  }
}
let state = {};
window.setState = changes => {
  state = Object.assign({}, state, changes);
  ReactDOM.render(<App {...state} />, document.getElementById("root"));
};

/* eslint no-restricted-globals: 0*/
let username = auth.getProfile().given_name || "new user";
let picture = auth.getProfile().picture;

let initialState = {
  name: username,
  auth,
  picture
};

window.setState(initialState);
