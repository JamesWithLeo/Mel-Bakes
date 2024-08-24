import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOekwW7CjBennsqE7aI2GHmcGFyT6vwcY",
  authDomain: "project-job-4f95d.firebaseapp.com",
  databaseURL:
    "https://project-job-4f95d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-job-4f95d",
  storageBucket: "project-job-4f95d.appspot.com",
  messagingSenderId: "709214072766",
  appId: "1:709214072766:web:9b2b524ca4679fd48a93ef",
  measurementId: "G-X444K97LSX",
};
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
