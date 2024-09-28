import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  PhoneAuthProvider,
  updatePhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
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
export const auth = getAuth(app);
auth.useDeviceLanguage();

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

export const updateUserNameAndPhoto = ({
  DisplayName,
  PhotoUrl,
}: {
  DisplayName?: string;
  PhotoUrl?: string;
}) => {
  if (!auth.currentUser) return;
  const user = auth.currentUser;
  try {
    updateProfile(user, { displayName: DisplayName, photoURL: PhotoUrl });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const paswordReset = async (email: string) => {
  return await sendPasswordResetEmail(auth, email)
    .then(() => {
      return Promise.resolve();
    })
    .catch((reason) => {
      return Promise.reject(reason.code);
    });
};

export const updateUserPhoneNumber = async (
  verificationId: string,
  code: string,
) => {
  if (!auth.currentUser) return;
  try {
    const phoneCredential = PhoneAuthProvider.credential(verificationId, code);
    await updatePhoneNumber(auth.currentUser, phoneCredential);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CreatePhoneAuthProvider = () => {
  return new PhoneAuthProvider(auth);
};
export const CreateRecaptchaVerifier = (
  onSolved: (response: any) => void,
  onExpire: () => void,
) => {
  return new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible", // Set the size to 'normal' to make it visible.
    callback: onSolved,
    "expired-callback": onExpire,
  });
};

export const deleteUserAccount = () => {
  auth.currentUser?.delete();
};

const googleProvider = new GoogleAuthProvider();

export const SignInWithGooglePopup = async () => {
  return await signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;

      const user = result.user;

      // IdP data available using getAdditionalUserInfo(result)
      // ...
      const idp = getAdditionalUserInfo(result);

      if (idp && idp.isNewUser) {
        return {
          isNewUser: true,
          user: {
            email: user.email,
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            displayName: user.displayName,
          },
        };
      } else if (idp && !idp.isNewUser) {
        return {
          isNewUser: false,
          user: {
            email: user.email,
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            displayName: user.displayName,
          },
        };
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log("credentital", credential);
      return null;
    });
};
