importScripts("https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.17.2/firebase-messaging.js"
);

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

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/firebase-logo.png",
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log(event);
  return event;
});
