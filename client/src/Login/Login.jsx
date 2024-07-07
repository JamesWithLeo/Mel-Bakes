import { Link, redirect, useNavigate } from "react-router-dom";

function Login({ setDisplay }) {
  const navigate = useNavigate();
  const checkAccount = async (event) => {
    const gmail = document.getElementById("gmailLoginTB").value;
    if (gmail) {
      const urlDestination = "melbake/login/" + gmail;
      <h1 className="my-8 text-3xl font-bold text-primary">Create Account</h1>;
      const response = await fetch(urlDestination);
      await response.json().then(async (value) => {
        console.log(typeof value);
        console.log(value);
        // navigate("/", { state: { account: res } }, { replace: true });
      });
      // redirect("/");
    } else {
      event.preventDefault();
    }
  };
  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center self-center px-4 py-4">
      <h1 className="my-8 text-3xl font-bold text-primary">Login Account</h1>

      <input
        className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:w-1/3"
        placeholder="Enter gmail"
        id="gmailLoginTB"
      />
      <input
        className="mt-4 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:w-1/3"
        placeholder="Enter password"
        id="passwordLoginTB"
      />
      <div className="mt-2 flex w-1/3 flex-col">
        <Link className="text-warning self-end text-xs">Forget Password</Link>
      </div>
      <button
        className="mt-4 h-8 w-full self-center rounded bg-primary py-2 text-center align-middle text-xs text-white sm:w-1/3 md:text-sm lg:px-4"
        onClick={checkAccount}
      >
        Login
      </button>
      <button
        className="mt-4 h-8 w-full self-center rounded bg-secondarylight py-1 text-center align-middle text-xs text-primary sm:w-1/3 md:text-sm"
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
