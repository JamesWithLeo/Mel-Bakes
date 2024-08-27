import * as React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Login } from "../slice/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { loginUser } from "../firebase";
import { IAccount } from "../appTypes";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [error, setError] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

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
      <div className="fixed left-1/2 top-1/4 z-20 flex w-full max-w-md -translate-x-1/2 flex-col items-center justify-between self-center rounded-lg bg-white p-8">
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
            className="mt-2 h-8 w-full self-center rounded bg-primary py-2 text-center align-middle text-xs text-white md:text-sm"
            onClick={checkAccount}
          >
            Login
          </button>
          <Link
            to={"Signin"}
            onClick={exitModal}
            className="mt-4 flex h-8 w-full items-center justify-center self-center rounded bg-secondarylight py-1 text-center align-middle text-xs text-primary md:text-sm"
          >
            Create account?
          </Link>
        </div>
      </div>
    </>
  );
}
