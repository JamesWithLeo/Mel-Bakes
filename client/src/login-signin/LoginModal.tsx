import * as React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Login, ResetAuthMessage } from "../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const AuthMessage = useSelector((state: AppState) => state.auth.AuthMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const checkAccount = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const loginButton = document.getElementById(
      "loginButton",
    ) as HTMLButtonElement;
    loginButton.disabled = true;
    loginButton.style.cursor = "wait";

    const gmailElement = document.getElementById(
      "gmailLoginTB",
    ) as HTMLInputElement;
    const passwordElement = document.getElementById(
      "passwordLoginTB",
    ) as HTMLInputElement;
    const gmail: string = gmailElement.value;
    const password: string = passwordElement.value;

    if (gmail && password) {
      dispatch(Login({ Gmail: gmail, Password: password }))
        .unwrap()
        .then((value) => {
          setTimeout(() => {
            loginButton.disabled = false;
            loginButton.style.cursor = "pointer";
          }, 3000);
          if (value.AuthMessage === "Account doesn't exist") {
            gmailElement.value = "";
            passwordElement.value = "";
          } else if (value.AuthMessage === "Wrong Password") {
            passwordElement.style.outlineColor = "red";
            passwordElement.style.color = "red";
          } else if (value.User && value.AuthMessage === null) {
            exitModal();
            navigate("/", { replace: true });
          }
        });
    }
  };
  function handleFocusInput() {
    const passwordElement = document.getElementById(
      "passwordLoginTB",
    ) as HTMLButtonElement;
    passwordElement.style.outlineColor = "";
    passwordElement.style.color = "black";
    setTimeout(() => {
      dispatch(ResetAuthMessage());
    }, 3000);
  }
  function exitModal() {
    onClose();
    dispatch(ResetAuthMessage());
    document.body.style.overflowY = "scroll";
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
          <h1 className="mb-3 font-sans text-sm text-red-500">{AuthMessage}</h1>
          <input
            onFocus={handleFocusInput}
            className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500"
            placeholder="Enter gmail"
            id="gmailLoginTB"
            type="gmail"
          />
          <input
            onFocus={handleFocusInput}
            className="mt-4 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500"
            placeholder="Enter password"
            id="passwordLoginTB"
            type="password"
          />
          <div className="mt-2 flex w-full flex-col">
            <Link className="self-end text-xs text-warning" to={"/forget"}>
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
