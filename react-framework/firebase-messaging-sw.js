importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCZSaWxtPJKnVTUtkmIDxIMCreCEr0ScbA",
  authDomain: "fir-fdef7.firebaseapp.com",
  databaseURL: "https://fir-fdef7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-fdef7",
  storageBucket: "fir-fdef7.appspot.com",
  messagingSenderId: "808423483984",
  appId: "1:808423483984:web:abdb73b3b73219b3b1bf55",
  measurementId: "G-S20W3SX3K1"
});

const messaging = firebase.messaging();

// Optional:
messaging.onBackgroundMessage( async (message) => {
  console.log("onBackgroundMessage", message);


  // return true
});