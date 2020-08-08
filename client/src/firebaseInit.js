import firebase from "firebase/app";
import "firebase/messaging";

const config = {
  apiKey: "AIzaSyAElLIaEfWyeAEXGg0cfn9cVJ1unQsAi0I",
  authDomain: "web-chat-72b52.firebaseapp.com",
  databaseURL: "https://web-chat-72b52.firebaseio.com",
  projectId: "web-chat-72b52",
  storageBucket: "web-chat-72b52.appspot.com",
  messagingSenderId: "442573275776",
  appId: "1:442573275776:web:9f6cefe95e1e61b96fdc65",
  measurementId: "G-3FDDZHC2DS",
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

// next block of code goes here

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });