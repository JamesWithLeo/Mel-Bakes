import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Login } from "../slice/authSlice";
import { loginUser } from "../firebase";
import { IAccount } from "../appTypes";
import plaidPattern from "../assets/images/pattern.svg";
import FooterComponent from "../components/Footer";

function LoginPage() {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const HandleLoginUser = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const emailElement = document.getElementById("emailTB") as HTMLInputElement;
    const passwordElement = document.getElementById(
      "passwordTB",
    ) as HTMLInputElement;
    const email: string = emailElement.value;
    const password: string = passwordElement.value;
    if (!email || !password) return;

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
            document.body.style.overflowY = "scroll";
            navigate("/", { replace: true });
          })
          .catch((reason) => {
            console.log(reason);
          });
      })
      .catch((reason) => {
        emailElement.style.outline = "solid";
        emailElement.style.outlineColor = "#ef4444";
        passwordElement.style.outline = "solid";
        passwordElement.style.outlineColor = "#ef4444";
        setError(reason);
      });
  };
  const HandleInputFocus = () => {
    const emailElement = document.getElementById("emailTB") as HTMLInputElement;
    const passwordElement = document.getElementById(
      "passwordTB",
    ) as HTMLInputElement;
    setError("");
    emailElement.style.outlineColor = "";
    passwordElement.style.outlineColor = "";
  };
  return (
    <>
      <div id="bodyWrapper" style={{ backgroundImage: `url(${plaidPattern})` }}>
        <div className="sticky top-0 z-0 flex w-full justify-center bg-secondarylight drop-shadow-lg">
          <header className="flex h-14 max-h-max w-full max-w-7xl items-center justify-between px-4">
            <h1 className="font-[Lobster] text-3xl text-[#424874]">
              Mel Bakes
            </h1>
          </header>
        </div>

        <div
          className="max-h-screen-lg flex h-dvh w-full items-center justify-center"
          id="mainWrapper"
        >
          <main className="flex h-full w-full flex-col bg-white p-4">
            <Link
              className="md:text-l w-max rounded bg-secondarylight px-2 text-sm text-gray-500 outline-primary sm:text-base md:px-3 md:py-1"
              to={"/"}
            >
              Back
            </Link>

            <div className="flex h-full w-full max-w-7xl flex-col items-center self-center px-4 py-4">
              <h1 className="my-8 text-3xl font-bold text-primary">
                Login Account
              </h1>
              <section className="flex w-full max-w-sm flex-col">
                <h1 className="mb-3 text-center font-sans text-sm text-red-500">
                  {error}
                </h1>
                <input
                  onFocus={HandleInputFocus}
                  className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                  placeholder="Enter gmail"
                  id="emailTB"
                />
                <input
                  onFocus={HandleInputFocus}
                  className="mt-4 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                  placeholder="Enter password"
                  type="password"
                  id="passwordTB"
                />
                <div className="mt-2 flex w-full flex-col sm:max-w-sm">
                  <Link
                    to={"/forget"}
                    className="self-end text-xs text-warning"
                  >
                    Forget Password
                  </Link>
                </div>
                <button
                  className="mt-4 h-8 w-full self-center rounded bg-primary py-2 text-center align-middle text-xs text-white sm:max-w-sm md:text-sm lg:px-4"
                  onClick={HandleLoginUser}
                >
                  Login
                </button>
                <Link
                  to={"/signin"}
                  className="mt-4 h-auto w-full self-center rounded bg-secondarylight py-2 text-center align-middle text-xs text-primary sm:max-w-sm md:text-sm"
                >
                  Doesn't have account?
                </Link>
              </section>
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
    </>
  );
}
export default LoginPage;
