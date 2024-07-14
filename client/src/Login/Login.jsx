import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
import { AuthConsumer } from "../authProvider";

function Login({ setDisplay }) {
  const Auth = AuthConsumer();
  const navigate = useNavigate();
  // const [account, seAccount] = useState();

  const checkAccount = async (event) => {
    const gmail = document.getElementById("gmailLoginTB").value;
    if (gmail) {
      const urlDestination = "melbake/login/" + gmail;
      const response = await fetch(urlDestination);
      await response.json().then(async (value) => {
        Auth.Login(value._id);
        navigate("/");
      });
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
        <Link className="self-end text-xs text-warning">Forget Password</Link>
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
          setDisplay(false);
        }}
      >
        Doesn't have account?
      </button>
    </div>
  );
}
export default Login;
