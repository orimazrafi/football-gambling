import firebase from "firebase";
export const cloudinaryFetchUrl = `https://res.cloudinary.com/dyloyoawh/image/upload`;
export const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dyloyoawh/image/upload`;
export const imageIcon = `iconfinder_image_103588_ig40fo`;
export const defualtImage = `Football-Free-Download-PNG_gvtfqq.png`;
export const columns = ["", "Name", "Admin", "Password", "Participante", ""];
export const BACKEND_URL = "https://football-gambling-backend.herokuapp.com/";
export const cloudinaryImageUrl =
  "https://res.cloudinary.com/dyloyoawh/image/upload/v1585922209/";
export const opponentsColumns = [
  "status",
  "home team",
  "away team",
  "final score",
  "you'r gamble",
  "points",
];
export const bullseyeObject = (id: string) => ({
  id,
  score: 3,
  name: "bullseye",
});
export const directionObject = (id: string) => ({
  id,
  score: 1,
  name: "direction",
});
export const losingObject = (id: string) => ({ id, score: 0, name: "none" });
export const WINNING_SCORE = 3;
export const DIRECTION_SCORE = 1;
export const LOSING_SCORE = 0;
export const userIdFromLocalStorage = () =>
  localStorage.getItem("user_id") as string;
export const theme = {
  primary: "teal",
  secondary: "green",
  font: "sans-serif",
  fontSize: "2rem",
  hoverBackground: "blue",
};
export const WEB_SOCKET_URI =
  "wss://football-gambling-backend.herokuapp.com/graphql";
export const firebaseConfiguration = () => {
  var config = {
    apiKey: "AIzaSyAb0gp2kEcjjJsFQi7_mzHzWrhNs0CJnwM",
    authDomain: "fir-cloud-messaging-1d789.firebaseapp.com",
    databaseURL: "https://fir-cloud-messaging-1d789.firebaseio.com",
    projectId: "fir-cloud-messaging-1d789",
    storageBucket: "fir-cloud-messaging-1d789.appspot.com",
    messagingSenderId: "979848836582",
    appId: "1:979848836582:web:01b052ee0d088fdc159227",
  };
  firebase.initializeApp(config);
  const messaging = firebase.messaging();
  return messaging;
};
