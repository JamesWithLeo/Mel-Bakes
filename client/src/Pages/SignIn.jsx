import { React, useContext, useEffect } from "react";
import plaidPattern from "../assets/images/pattern.svg";
import FooterComponent from "../Footer/Footer.jsx";
import { Link } from "react-router-dom";

import { AccountContext } from "../Context.jsx";

function SignIn() {
  const Account = useContext(AccountContext);

  let locationHref = "/";
  const handleCreateAccount = (event) => {
    // fetch the gmail value from element
    const username = document.getElementById("usernameSigninTB").value;

    // fetch the gmail value from element
    const gmail = document.getElementById("gmailSigninTB").value;

    // fetch the password value from element
    const passwordConfirm = document.getElementById(
      "passwordSigninTBConfirm",
    ).value;
    const password = document.getElementById("passwordSigninTB").value;

    // confirm if gmail doesn't exist
    if (!username) {
      event.preventDefault();
      return;
    } else if (!gmail) {
      event.preventDefault();
      return;
    } else if (password !== passwordConfirm) {
      event.preventDefault();
      return;
    }
    Account.Username = username;
    Account.Gmail = gmail;
    Account.Password = password;
    Account.IsLogged = true;
  };

  return (
    <div id="bodyWrapper" style={{ backgroundImage: `url(${plaidPattern})` }}>
      <div className="sticky top-0 z-0 flex w-full justify-center bg-secondarylight drop-shadow-lg">
        <header className="flex h-14 max-h-max w-full max-w-7xl items-center justify-between px-4">
          <h1 className="font-[Lobster] text-3xl text-[#424874]">Mel Bakes</h1>
        </header>
      </div>

      <div
        className="max-h-screen-lg flex h-screen max-h-[1000px] w-full items-center justify-center"
        id="mainWrapper"
      >
        <main className="flex h-full w-full flex-col bg-white p-4">
          <Link
            className="md:text-l w-max rounded bg-secondarylight px-2 text-sm text-gray-500 outline-primary sm:text-base md:px-3 md:py-1"
            to={"/"}
          >
            Back
          </Link>
          <div className="flex h-max w-full max-w-7xl flex-col items-center gap-8 self-center px-4 py-20">
            <input
              className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:w-1/3"
              type="text"
              placeholder="Enter username"
              id="usernameSigninTB"
            />
            <input
              className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:w-1/3"
              type="text"
              placeholder="Enter gmail"
              id="gmailSigninTB"
            />
            <input
              className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:w-1/3"
              type="password"
              placeholder="Create password"
              id="passwordSigninTB"
            />
            <input
              className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:w-1/3"
              type="password"
              placeholder="Confirm password"
              id="passwordSigninTBConfirm"
            />
            <Link
              className="w-full rounded bg-primary py-2 text-center text-white active:ring sm:w-1/3"
              onClick={handleCreateAccount}
              to={locationHref}
            >
              Sign in
            </Link>
          </div>
        </main>
      </div>

      <div
        className="flex h-max w-full justify-center bg-[#393646]"
        id="footerWrapper"
      >
        <FooterComponent />
      </div>
    </div>
  );
}
export default SignIn;
