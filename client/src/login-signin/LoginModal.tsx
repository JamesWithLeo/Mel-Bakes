import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Login, Signin } from "../slice/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { loginUser, SignInWithGooglePopup } from "../firebase";
import { IAccount } from "../appTypes";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [error, setError] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const checkAccount = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const emailElement = document.getElementById(
      "gmailLoginTB",
    ) as HTMLInputElement;
    const passwordElement = document.getElementById(
      "passwordLoginTB",
    ) as HTMLInputElement;
    const email: string = emailElement.value;
    const password: string = passwordElement.value;

    if (email && password) {
      const user = loginUser(email, password);
      user
        .then((value) => {
          const email = value.email;
          const uid = value.uid;
          const displayName = value.displayName;
          const phoneNumber = value.phoneNumber;
          if (!email || !uid) return;
          dispatch(
            Login({
              Email: email,
              Uid: uid,
              PhoneNumber: phoneNumber,
              DisplayName: displayName,
            }),
          )
            .unwrap()
            .then((data: IAccount) => {
              if (data._id) exitModal();
            });
        })
        .catch((reason) => {
          if (reason === "auth/invalid-email")
            emailElement.style.outline = "solid";
          else {
            emailElement.style.outline = "solid";
            emailElement.style.outlineColor = "#ef4444";
            passwordElement.style.outline = "solid";
            passwordElement.style.outlineColor = "#ef4444";
          }
          setError(reason);
        });
    }
  };

  function handleFocusInput() {
    setError("");
    const emailElement = document.getElementById(
      "gmailLoginTB",
    ) as HTMLInputElement;
    const passwordElement = document.getElementById(
      "passwordLoginTB",
    ) as HTMLButtonElement;
    emailElement.style.outlineColor = "";
    passwordElement.style.outlineColor = "";
  }
  function exitModal() {
    document.body.style.overflowY = "scroll";
    onClose();
  }
  return (
    <>
      <div
        className="fixed z-20 h-screen w-full bg-[#393664] opacity-70"
        onClick={exitModal}
      />
      <div className="fixed left-1/2 top-1/4 z-20 flex w-full max-w-md -translate-x-1/2 flex-col items-center justify-between self-center rounded-lg bg-white p-4 sm:p-8">
        <div className="flex w-full flex-col">
          <button className="self-end" onClick={exitModal}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="text-xl text-primary"
            />
          </button>
        </div>
        <div className="flex w-full flex-col items-center p-4">
          <h1 className="mb-12 mt-4 text-3xl font-bold text-primary">
            Login Account
          </h1>

          <h1 className="mb-3 font-sans text-sm text-red-500">{error}</h1>
          <input
            onFocus={handleFocusInput}
            className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500"
            placeholder="Enter your email"
            id="gmailLoginTB"
            type="gmail"
          />
          <input
            onFocus={handleFocusInput}
            className="mt-4 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500"
            placeholder="Enter your password"
            id="passwordLoginTB"
            type="password"
          />
          <div className="mt-2 flex w-full flex-col">
            <Link
              className="self-end text-xs text-warning underline-offset-1 hover:underline"
              to={"/forget"}
              onClick={() => {
                document.body.style.overflowY = "scroll";
              }}
            >
              Forget Password
            </Link>
          </div>
          <button
            id="loginButton"
            className="mt-2 h-max w-full self-center rounded bg-primary py-2 text-center align-middle font-medium text-white hover:shadow-md active:bg-opacity-95 md:text-base"
            onClick={checkAccount}
          >
            Login
          </button>
          <button
            className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded bg-[#f2f2f2] py-2 text-center align-middle text-xs font-medium text-[#1f1f1f] hover:shadow md:text-base"
            onClick={async () => {
              const credential = await SignInWithGooglePopup();
              if (!credential) return;

              const IsNewUser = credential.isNewUser;
              const { email, phoneNumber, uid, displayName } = credential.user;
              if (!IsNewUser) {
                dispatch(
                  Login({
                    Email: email,
                    Uid: uid,
                    PhoneNumber: phoneNumber,
                    DisplayName: displayName,
                  }),
                );
                exitModal();
                return;
              }

              // create a new account in mongo db
              document.body.style.overflowY = "scroll";
              const response = await dispatch(
                Signin({
                  Email: email,
                  Uid: uid,
                  PhoneNumber: phoneNumber,
                  DisplayName: displayName,
                }),
              ).unwrap();
              if (response.insertedId) {
                dispatch(
                  Login({
                    Email: email,
                    Uid: uid,
                    PhoneNumber: phoneNumber,
                    DisplayName: displayName,
                  }),
                )
                  .unwrap()
                  .then(() => {
                    navigate("/setup", { replace: true });
                  });
              }
            }}
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              height={20}
              width={20}
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
}
