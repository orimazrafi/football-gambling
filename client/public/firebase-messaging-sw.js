importScripts("https://www.gstatic.com/firebasejs/6.0.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.0.1/firebase-messaging.js");
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
