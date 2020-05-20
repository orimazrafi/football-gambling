import firebase from "firebase-admin";
import serviceAccount from "./serviceAccount.json";
export const connect = () => {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://fir-cloud-messaging-1d789.firebaseio.com",
  });
};
