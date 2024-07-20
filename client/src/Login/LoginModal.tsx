import * as React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AuthConsumer } from "../authProvider";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ setDisplay }) {
  const Auth = AuthConsumer();
  const navigate = useNavigate();
  // const [account, seAccount] = useState();

  const checkAccount = async (event) => {
    const gmail = document.getElementById("gmailLoginTB") as HTMLInputElement;
    if (gmail.value) {
      const urlDestination = "melbake/login/" + gmail.value;
      const response = await fetch(urlDestination);
      await response.json().then(async (account) => {
        console.log(account.Type);
        Auth.Login(account._id, account.Type);
        navigate("/");
        exitModal();
      });
    } else {
      event.preventDefault();
    }
  };
  function exitModal() {
    setDisplay(false);
    document.body.style.overflowY = "scroll";
  }
  return (
    <>
      <div
        className="fixed z-10 h-screen w-full bg-[#393664] opacity-70"
        onClick={exitModal}
      />
      <div className="fixed left-1/2 top-1/4 z-10 flex w-full max-w-md -translate-x-1/2 flex-col items-center justify-between self-center rounded-lg bg-white p-8">
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

          <input
            className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500"
            placeholder="Enter gmail"
            id="gmailLoginTB"
            type="gmail"
          />
          <input
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
            className="mt-2 h-8 w-full self-center rounded bg-primary py-2 text-center align-middle text-xs text-white md:text-sm"
            onClick={checkAccount}
          >
            Login
          </button>
          <Link
            to={"Signin"}
            onClick={exitModal}
            className="mt-4 h-8 w-full self-center rounded bg-secondarylight py-1 text-center align-middle text-xs text-primary md:text-sm"
          >
            Create account?
          </Link>
        </div>
      </div>
    </>
  );
}
