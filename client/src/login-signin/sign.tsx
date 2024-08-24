import { useRef, useState } from "react";
import { createUser, loginUser } from "../firebase";
import { useDispatch } from "react-redux";
import { Login, Signin } from "../slice/authSlice";
import { AppDispatch } from "../store";
import { IAccount } from "../appTypes";
import { useNavigate } from "react-router-dom";
import plaidPattern from "../assets/images/pattern.svg";
import FooterComponent from "../components/Footer";
import { Link } from "react-router-dom";
import Confimation from "../components/confimation";

function SignPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  type IuserInfo = {
    firstName: string;
    lastName: string;
    address: string;
    gender: string;
    dateOfbirth: string;
  };
  const [userInfo, setUserInfo] = useState<IuserInfo | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const emailRef = useRef("");
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const handleCreateAccount = () => {
    const emailElement = document.getElementById("emailTb") as HTMLInputElement;
    const passwordElement = document.getElementById(
      "passwordConfirmTb",
    ) as HTMLInputElement;

    if (!userInfo) {
      setStep(1);
      return;
    }
    const email = emailElement.value.toLowerCase();
    const password = passwordElement.value.trim();
    const firstName = userInfo.firstName.toLowerCase();
    const lastName = userInfo.lastName.toLowerCase();
    const address = userInfo.address.toLowerCase();
    const gender = userInfo.gender;
    const dateOfBirth = userInfo.dateOfbirth;
    const user = createUser(email, password);
    user
      .then((value) => {
        const uid = value.uid;
        if (!uid || !email) return;
        dispatch(
          Signin({
            Email: email,
            Uid: uid,
            FirstName: firstName,
            LastName: lastName,
            Address: address,
            Gender: gender,
            DateOfBirth: dateOfBirth,
          }),
        )
          .unwrap()
          .then((data) => {
            if (!data.insertedId) window.location.reload();
            {
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
                      if (data._id) navigate("/");
                    });
                })
                .catch((reason) => {
                  navigate("/");
                });
            }
          });
      })
      .catch((reason) => {
        console.log(reason);
      });
  };
  return (
    <>
      {isConfirming ? (
        <Confimation
          title="Create account"
          context={`Are you sure you want to create account to this email: ${emailRef.current} `}
          modalType={"boolean"}
          icon="question"
          onConfirm={handleCreateAccount}
          closeModal={() => {
            setIsConfirming(false);
          }}
        />
      ) : null}
      <div id="bodyWrapper" style={{ backgroundImage: `url(${plaidPattern})` }}>
        <div className="sticky top-0 z-0 flex w-full justify-center bg-secondarylight drop-shadow-lg">
          <header className="flex h-14 max-h-max w-full max-w-7xl items-center justify-between px-4">
            <h1 className="font-[Lobster] text-3xl text-[#424874]">
              Mel Bakes
            </h1>
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
            <div className="flex h-full w-full max-w-7xl flex-col items-center gap-4 self-center px-4 py-4">
              <h1 className="my-8 text-3xl font-bold text-primary">
                Create Account
              </h1>
              {step === 2 ? (
                <section className="flex h-full w-full max-w-sm flex-col items-center gap-4">
                  <input
                    className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                    type="text"
                    required
                    placeholder="Enter your username"
                    id="displaynameTb"
                  />
                  <input
                    className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                    type="text"
                    required
                    placeholder="Enter your email"
                    id="emailTb"
                  />
                  <input
                    className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                    type="password"
                    required
                    placeholder="Create password"
                    id="passwordTb"
                  />
                  <input
                    className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                    type="password"
                    required
                    placeholder="Confirm password"
                    id="passwordConfirmTb"
                  />
                  <button
                    className="font-Redhat w-full rounded bg-primary py-2 text-center text-white active:ring sm:max-w-sm"
                    onClick={() => {
                      const displayName = document.getElementById(
                        "displaynameTb",
                      ) as HTMLInputElement;
                      const emailElement = document.getElementById(
                        "emailTb",
                      ) as HTMLInputElement;
                      const passwordConfirm = document.getElementById(
                        "passwordTb",
                      ) as HTMLInputElement;
                      const passwordElement = document.getElementById(
                        "passwordConfirmTb",
                      ) as HTMLInputElement;

                      if (!displayName.value) return;
                      if (!emailElement.value) return;
                      if (passwordElement.value !== passwordConfirm.value)
                        return;
                      if (!emailElement) return;
                      emailRef.current = emailElement.value;
                      setIsConfirming(true);
                    }}
                  >
                    Sign in
                  </button>
                  <button
                    className="font-Redhat w-full rounded py-2 text-center text-primary hover:bg-gray-100 active:ring sm:max-w-sm"
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    back
                  </button>
                </section>
              ) : (
                <section className="flex h-full w-full max-w-sm flex-col items-center gap-4">
                  <span className="flex w-full max-w-sm items-center justify-between gap-4">
                    <h1 className="font-Redhat text-darker">First name</h1>
                    <input
                      className="h-8 rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                      id="firstName"
                    />
                  </span>
                  <span className="flex w-full max-w-sm items-center justify-between gap-4">
                    <h1 className="font-Redhat text-darker">Last name</h1>
                    <input
                      className="h-8 rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                      id="lastName"
                    />
                  </span>

                  <span className="flex w-full max-w-sm items-center justify-between gap-4">
                    <h1 className="font-Redhat text-darker">Address</h1>
                    <input
                      className="h-8 rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                      id="address"
                    />
                  </span>
                  <span className="flex w-full max-w-sm justify-between gap-4">
                    <h1 className="font-Redhat text-darker">Gender</h1>
                    <select
                      className="h-8 rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                      id="gender"
                    >
                      <option>male</option>
                      <option>female</option>
                      <option>other</option>
                    </select>
                  </span>
                  <span className="flex w-full max-w-sm justify-between gap-4">
                    <h1 className="font-Redhat w-max text-darker">
                      Date of birth
                    </h1>
                    <input
                      type="date"
                      id="dateOfBirth"
                      className="h-8 rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                    />
                  </span>
                  <button
                    className="w-full rounded bg-primary py-2 text-center text-white active:ring sm:max-w-sm"
                    onClick={() => {
                      const firstName = document.getElementById(
                        "firstName",
                      ) as HTMLInputElement;
                      const lastName = document.getElementById(
                        "lastName",
                      ) as HTMLInputElement;
                      const gender = document.getElementById(
                        "gender",
                      ) as HTMLInputElement;
                      const address = document.getElementById(
                        "address",
                      ) as HTMLInputElement;
                      const dateOfBirth = document.getElementById(
                        "dateOfBirth",
                      ) as HTMLInputElement;
                      if (
                        !firstName.value ||
                        !lastName.value ||
                        !gender.value ||
                        !address.value ||
                        !dateOfBirth.value
                      )
                        return;
                      setUserInfo({
                        firstName: firstName.value,
                        lastName: lastName.value,
                        address: address.value,
                        dateOfbirth: dateOfBirth.value,
                        gender: gender.value,
                      });
                      setStep(2);
                    }}
                  >
                    Next
                  </button>
                  <Link
                    to={"/login"}
                    className="h-auto w-full self-center rounded bg-secondarylight py-2 text-center align-middle text-xs text-primary sm:max-w-sm md:text-sm"
                  >
                    Already have account?
                  </Link>
                </section>
              )}
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
export default SignPage;
