import { useState } from "react";
import { paswordReset } from "../firebase";
import FooterComponent from "./Footer";
import HeaderComponent from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Notify from "./notify";

export default function ForgetLayout() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const HandleForgetPassword = async () => {
    const emailElement = document.getElementById("emailTb") as HTMLInputElement;

    if (!emailElement.value) return;
    const response = paswordReset(emailElement.value);
    response
      .then((value) => {
        document.body.style.overflowY = "hidden";
        console.log(value);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          document.body.style.overflowY = "auto";
          navigate("/", { replace: true });
        }, 3000);
      })
      .catch((reason) => {
        setError(reason);
      });
  };
  return (
    <>
      {isSuccess ? (
        <>
          <div className="fixed z-20 flex h-dvh w-full bg-primarylight opacity-70" />
          <div className="absolute left-1/2 top-1/2 z-20 h-max w-max -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 bg-transparent">
            <Notify text="Email sent!" type="information" />
          </div>
        </>
      ) : null}
      <main className="flex flex-col items-center">
        <HeaderComponent />

        <section className="h-max w-full max-w-7xl p-4">
          <Link
            className="md:text-l w-max rounded bg-secondarylight px-2 text-sm text-gray-500 outline-primary sm:text-base md:px-3 md:py-1"
            to={"/"}
          >
            Back
          </Link>

          <div className="flex h-96 w-full justify-center">
            <div className="flex h-full w-full max-w-sm flex-col justify-center gap-4">
              <h1 className="my-8 text-center text-3xl font-bold text-primary">
                Forgot password
              </h1>
              <h1 className="mb-3 text-center font-sans text-sm text-red-500">
                {error}
              </h1>
              <input
                className="w-full rounded bg-slate-100 px-2 py-2 outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500"
                placeholder="Enter your email"
                id="emailTb"
                type="email"
                onFocus={() => {
                  setError("");
                }}
              />
              <button
                className="w-full rounded bg-red-400 px-2 py-2 text-center font-Redhat"
                onClick={HandleForgetPassword}
              >
                send password reset email
              </button>
            </div>
          </div>
        </section>

        <FooterComponent />
      </main>
    </>
  );
}
