import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import "dotenv/config";
import * as dotenv from "dotenv";
dotenv.config({ debug: false });
const firebaseConfig = {
  apiKey: process.env.apikey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
console.log(auth.currentUser);
export const createUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((value) => {
      const user = value.user;
      return user;
    })
    .catch((error) => {
      return error.code;
    });
};

export const loginUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((value) => {
      const user = value.user;
      return user;
    })
    .catch((error) => {
      return error.code;
    });
};
