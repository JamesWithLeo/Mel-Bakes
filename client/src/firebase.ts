import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((value) => {
      const user = value.user;
      return user;
    })
    .catch((error) => {
      return Promise.resolve(error.code);
    });
};

export const loginUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((value) => {
      const user = value.user;
      return user;
    })
    .catch((error) => {
      return Promise.reject(error.code);
    });
};

export const logoutUser = () => {
  auth.signOut();
  localStorage.removeItem("melbakesUser");
};

onAuthStateChanged(auth, (user) => {});

export const updateUser = ({
  DisplayName,
  PhotoUrl,
}: {
  DisplayName?: string;
  PhotoUrl?: string;
}) => {
  if (!auth.currentUser) return;
  const user = auth.currentUser;
  updateProfile(user, { displayName: DisplayName, photoURL: PhotoUrl });
};
