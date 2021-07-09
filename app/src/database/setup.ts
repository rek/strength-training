import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

const app = firebase.initializeApp(firebaseConfig);

const email = import.meta.env.VITE_user || "";
const password = import.meta.env.VITE_pass || "";

const firestore = app.firestore();

const firebaseDoingAuth = firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("errorCode", errorCode);
    console.log("errorMessage", errorMessage);
  });

export { app, firestore, firebaseDoingAuth };
