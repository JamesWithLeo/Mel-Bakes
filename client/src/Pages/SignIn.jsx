import { React, useState } from "react";
import plaidPattern from "../assets/images/pattern.svg";
import FooterComponent from "../Footer/Footer.jsx";
import { Link } from "react-router-dom";
import Login from "../Login/Login.jsx";
import Sign from "../Login/sign.jsx";

function SignIn() {
  const [log, setLog] = useState(true);
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
          {log ? <Login setDisplay={setLog} /> : <Sign setDisplay={setLog} />}
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
