import { toast } from "react-toastify";
import {
  firebaseConfiguration,
  userIdFromLocalStorage,
  BACKEND_URL,
} from "../helpers";
import { request } from "graphql-request";
import { ADD_FIREBASE_MESSAGE_TOKEN } from "../mutations";
export const useAddTokenAndMessageNotificationListener = () => {
  const messaging = firebaseConfiguration();
  messaging
    .requestPermission()
    .then(() => {
      return messaging.getToken();
    })
    .then(async (token: string) => {
      const userId = userIdFromLocalStorage();
      request(BACKEND_URL, ADD_FIREBASE_MESSAGE_TOKEN, {
        token,
        userId,
      });
    })
    .catch((err) => {
      console.log("Unable to get permission to notify.", err);
    });
  navigator.serviceWorker.addEventListener("message", (message) => {
    toast.success(
      message.data["firebase-messaging-msg-data"].notification.title
    );
  });
};
