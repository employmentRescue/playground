import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCZSaWxtPJKnVTUtkmIDxIMCreCEr0ScbA",
  authDomain: "fir-fdef7.firebaseapp.com",
  databaseURL: "https://fir-fdef7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-fdef7",
  storageBucket: "fir-fdef7.appspot.com",
  messagingSenderId: "808423483984",
  appId: "1:808423483984:web:abdb73b3b73219b3b1bf55",
  measurementId: "G-S20W3SX3K1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

async function requestPermission() {
  console.log('Requesting permission...');
  await Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
  })
}

requestPermission();

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

// Add the public key generated from the console here.
export const requestForToken = () => {
  getToken(messaging, { vapidKey: "BNQmQhy0t5IXHTfP3RhasoNL_no_HYBNDPnygCfciW5c3nopkkWkqxasbcesQ5DzISkX5JvheAIOrNaeeBrQ2ho" }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log("current Token : ", currentToken)
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
};

// foreground message handling
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });