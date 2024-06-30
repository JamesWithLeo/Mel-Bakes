// system
import { React, useState, useContext } from "react";
import { AccountContext } from "../Context";
// design assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// design assets

function LoginAccount({ setDisplay }) {
  const Account = useContext(AccountContext);
  const [urlTarget, setUrlTarget] = useState("/");

  const exitLogin = () => {
    setDisplay(false);
    document.body.style.overflowY = "scroll";
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome,
  };
  const checkAccount = async (event) => {
    const gmail = document.getElementById("gmailLoginTB").value;
    if (gmail) {
      const urlDestination = "melbake/login/" + gmail;
      const response = await fetch(urlDestination);
      const res = await response.json();
      console.log(typeof res);
      console.log(res);
      Account._Id = res._Id;
      Account.IsLogged = true;
      Account.Gmail = gmail;
      setUrlTarget("admin");
    } else {
      event.preventDefault();
    }
  };
  return (
    <>
      <div
        className="fixed z-10 flex h-svh w-full items-center justify-center bg-[#393664] opacity-50"
        id="loginWrapper__outsideWrapper"
        onClick={exitLogin}
      ></div>

      <div
        className="fixed inset-x-0 z-10 mx-auto mt-36 flex w-screen flex-col rounded-md bg-white py-4 sm:h-max sm:w-[500px] lg:py-12"
        id="loginWrapper"
      >
        <button
          className="mb-4 mr-4 self-end align-middle text-gray-300"
          onClick={exitLogin}
          id="exitLogin"
        >
          <FontAwesomeIcon
            className="md:text-2xl lg:text-3xl"
            icon={faRightFromBracket}
          />
        </button>

        <div
          className="flex w-3/4 flex-col gap-4 self-center"
          id="tbLoginContainer"
        >
          <input
            className="h-4 w-full self-center bg-gray-100 px-2 py-4 text-xs outline-primary md:h-10 md:pl-2 md:text-sm lg:text-base"
            type="text"
            placeholder="Enter gmail"
            id="gmailLoginTB"
          />

          <input
            className="h-4 w-full self-center bg-gray-100 px-2 py-4 text-xs outline-primary md:h-10 md:pl-2 md:text-sm lg:text-base"
            type="password"
            placeholder="Enter password"
            id="passwordLoginTB"
          />

          <Link
            onClick={checkAccount}
            to={urlTarget}
            id="LoginAccountButton"
            className="h-max w-full self-center rounded-sm bg-primary py-2 text-center align-middle text-xs text-white md:py-3 md:text-sm lg:px-4"
          >
            Login
          </Link>
          <div className="flex h-max w-full justify-between self-center">
            <p className="h-4 text-xs" id="remeberAccountButton">
              Remember me
            </p>
            <p className="h-4 text-xs" id="forgotAccountButton">
              Forgot Password
            </p>
          </div>
          <Link
            className="h-max w-max self-center rounded-sm border-2 border-primary bg-white px-2 py-1 text-center align-middle text-xs text-primary md:text-sm"
            to={"Signin"}
            id="SignInButton"
            onClick={exitLogin}
          >
            Create Account
          </Link>
        </div>
      </div>
    </>
  );
}
export default LoginAccount;
