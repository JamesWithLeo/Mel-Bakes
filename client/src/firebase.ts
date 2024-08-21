import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnwQW4BYUAdZUUHyaNF1V_pX9VnrWi_64",
  authDomain: "mel-bakes.firebaseapp.com",
  projectId: "mel-bakes",
  storageBucket: "mel-bakes.appspot.com",
  messagingSenderId: "355063997264",
  appId: "1:355063997264:web:4cb61f65338a35ce6fc255",
  measurementId: "G-1KRVGRN6TT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export const createUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((value) => {
      const user = value.user;
      return user;
    })
    .catch((error) => {
      return error.code;
    });
};

export const loginUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((value) => {
      const user = value.user;
      return user;
    })
    .catch((error) => {
      return error.code;
    });
};
