import UserStore from "../../store/user";
import firebase from "firebase-admin";

export const sendFirebaseMessagesToAllUserResolver = async (obj, args, req) => {
  const { title, body } = args;
  const firebaseToken = await UserStore.getAllUsersToken();
  const payload = await UserStore.setNotificationPayload(title, body);
  const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };
  firebase.messaging().sendToDevice(firebaseToken, payload, options);
  return { success: false };
};
