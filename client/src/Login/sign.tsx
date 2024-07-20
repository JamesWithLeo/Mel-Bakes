import * as React from "react";
import { Link } from "react-router-dom";

function Sign({ setDisplay }) {
  async function writeUser(userAccount) {
    await fetch("/melbake/signin/create/", {
      method: "POST",
      body: userAccount,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      console.log(response);
    });
  }
  const handleCreateAccount = (event) => {
    // fetch the value from input fields
    const firstname = document.getElementById(
      "firstnameSigninTB",
    ) as HTMLInputElement;
    const lastname = document.getElementById(
      "lastnameSigninTB",
    ) as HTMLInputElement;
    const gmail = document.getElementById("gmailSigninTB") as HTMLInputElement;
    const passwordConfirm = document.getElementById(
      "passwordSigninTBConfirm",
    ) as HTMLInputElement;
    const password = document.getElementById(
      "passwordSigninTB",
    ) as HTMLInputElement;

    // required the value in the inputs
    if (!firstname.value && !lastname.value) {
      event.preventDefault();
      return;
    } else if (!gmail.value) {
      event.preventDefault();
      return;
    } else if (password.value !== passwordConfirm.value) {
      event.preventDefault();
      return;
    }

    const body = JSON.stringify({
      FirstName: firstname.value,
      LastName: lastname.value,
      Gmail: gmail.value,
      Password: password.value,
    });
    writeUser(body);
    console.log(body);
  };
  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center gap-4 self-center px-4 py-4">
      <h1 className="my-8 text-3xl font-bold text-primary">Create Account</h1>
      <input
        className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
        type="text"
        placeholder="Enter First name"
        id="firstnameSigninTB"
      />
      <input
        className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
        type="text"
        placeholder="Enter Last name"
        id="lastnameSigninTB"
      />
      <input
        className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
        type="text"
        placeholder="Enter gmail"
        id="gmailSigninTB"
      />
      <input
        className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
        type="password"
        placeholder="Create password"
        id="passwordSigninTB"
      />
      <input
        className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
        type="password"
        placeholder="Confirm password"
        id="passwordSigninTBConfirm"
      />
      <Link
        to={"/"}
        className="w-full rounded bg-primary py-2 text-center text-white active:ring sm:max-w-sm"
        onClick={handleCreateAccount}
      >
        Sign in
      </Link>
      <button
        className="h-auto w-full self-center rounded bg-secondarylight py-2 text-center align-middle text-xs text-primary sm:max-w-sm md:text-sm"
        onClick={() => {
          setDisplay(true);
        }}
      >
        Already have account?
      </button>
    </div>
  );
}
export default Sign;
