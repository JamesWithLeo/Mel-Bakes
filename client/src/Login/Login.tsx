import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Login } from "../slice/authSlice";
interface ILogin {
  setVisibility: React.Dispatch<React.SetStateAction<Boolean>>;
}
function LoginPage({ setVisibility }: ILogin) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // const [account, seAccount] = useState();

  const checkAccount = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const gmailElement = document.getElementById(
      "gmailLoginTB",
    ) as HTMLInputElement;
    const passwordElement = document.getElementById(
      "passwordLoginTB",
    ) as HTMLInputElement;
    const gmail: string = gmailElement.value;
    const password: string = passwordElement.value;
    if (gmail) {
      dispatch(Login({ Gmail: gmail, Password: password }));
      navigate("/", { replace: true });
    } else {
      event.preventDefault();
    }
  };
  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center self-center px-4 py-4">
      <h1 className="my-8 text-3xl font-bold text-primary">Login Account</h1>

      <input
        className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
        placeholder="Enter gmail"
        id="gmailLoginTB"
      />
      <input
        className="mt-4 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
        placeholder="Enter password"
        id="passwordLoginTB"
      />
      <div className="mt-2 flex w-full flex-col sm:max-w-sm">
        <Link to={"/forget"} className="self-end text-xs text-warning">
          Forget Password
        </Link>
      </div>
      <button
        className="mt-4 h-8 w-full self-center rounded bg-primary py-2 text-center align-middle text-xs text-white sm:max-w-sm md:text-sm lg:px-4"
        onClick={checkAccount}
      >
        Login
      </button>
      <button
        className="mt-4 h-auto w-full self-center rounded bg-secondarylight py-2 text-center align-middle text-xs text-primary sm:max-w-sm md:text-sm"
        onClick={() => {
          setVisibility(false);
        }}
      >
        Doesn't have account?
      </button>
    </div>
  );
}
export default LoginPage;
