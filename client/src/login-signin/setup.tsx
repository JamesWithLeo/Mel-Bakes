import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store";
import { Navigate, useNavigate } from "react-router-dom";
import plaidPattern from "../assets/images/pattern.svg";
import FooterComponent from "../components/Footer";
import Confimation from "../components/confimation";
import HeaderLogoOnly from "../components/HeaderLogo";
import { bulkUpdate } from "../slice/authSlice";

function Setup() {
  const user = useSelector((state: AppState) => state.auth.User);
  const dispatch = useDispatch<AppDispatch>();
  const emailRef = useRef("");
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const navigate = useNavigate();

  const HandleClear = () => {
    const firstName = document.getElementById("firstName") as HTMLInputElement;
    const lastName = document.getElementById("lastName") as HTMLInputElement;
    const address = document.getElementById("address") as HTMLInputElement;
    const gender = document.getElementById("gender") as HTMLSelectElement;
    const dateOfBirth = document.getElementById(
      "dateOfBirth",
    ) as HTMLInputElement;

    const inputs = [firstName, lastName, address, gender, dateOfBirth];
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  const inputValidation = () => {
    const firstName = document.getElementById("firstName") as HTMLInputElement;
    const lastName = document.getElementById("lastName") as HTMLInputElement;
    const address = document.getElementById("address") as HTMLInputElement;
    const gender = document.getElementById("gender") as HTMLSelectElement;
    const dateOfBirth = document.getElementById(
      "dateOfBirth",
    ) as HTMLInputElement;

    const inputs = [firstName, lastName, address, gender, dateOfBirth];

    const isValid = inputs.every((input) => {
      if (input.value) {
        input.style.outlineColor = "";
        return true;
      } else {
        input.style.outline = "solid";
        input.style.outlineColor = "#ef4444";
        return false;
      }
    });

    if (!isValid) return null;

    return {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      gender: gender.value,
      dateOfBirth: dateOfBirth.value,
    };
  };
  const HandleFinishSetup = async () => {
    const userInfo = inputValidation();
    if (userInfo) {
      const response = await dispatch(
        bulkUpdate({ id: user!._id!, updatedValues: userInfo }),
      ).unwrap();
      if (response.User?._id) {
        navigate("/", { replace: true });
      }
    }
  };

  if (!user || !user._id) return <Navigate to={"/"} replace={true} />;
  if (
    user.firstName &&
    user.lastName &&
    user.address &&
    user.gender &&
    user.dateOfBirth
  )
    return <Navigate to={"/"} replace={true} />;
  else
    return (
      <>
        {isConfirming ? (
          <Confimation
            title="Create account"
            context={`Are you sure you want to create account to this email: ${emailRef.current} `}
            modalType={"boolean"}
            icon="question"
            onConfirm={HandleFinishSetup}
            closeModal={() => {
              setIsConfirming(false);
            }}
          />
        ) : null}
        <div
          id="bodyWrapper"
          style={{ backgroundImage: `url(${plaidPattern})` }}
        >
          <HeaderLogoOnly />

          <div
            className="max-h-screen-lg flex h-screen max-h-[1000px] w-full items-center justify-center"
            id="mainWrapper"
          >
            <main className="flex h-full w-full flex-col bg-white p-4">
              <div className="flex h-full w-full max-w-7xl flex-col items-center gap-4 self-center px-4 py-4">
                <h1 className="my-8 text-3xl font-bold text-primary">
                  Profile Setup
                </h1>

                <section className="flex h-full w-full max-w-sm flex-col items-center gap-4">
                  <span className="flex w-full max-w-sm flex-col items-center justify-between gap-1 sm:flex-row sm:gap-4">
                    <h1 className="self-start font-Redhat text-darker sm:self-auto">
                      Email
                    </h1>
                    <input
                      className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:w-max sm:max-w-sm"
                      readOnly
                      defaultValue={user.email!}
                    />
                  </span>

                  <span className="flex w-full max-w-sm flex-col items-center justify-between gap-1 sm:flex-row sm:gap-4">
                    <h1 className="self-start font-Redhat text-darker sm:self-auto">
                      First name
                    </h1>
                    <input
                      type="text"
                      name="firstName"
                      className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:w-max sm:max-w-sm"
                      defaultValue={user.firstName!}
                      id="firstName"
                    />
                  </span>
                  <span className="flex w-full max-w-sm flex-col items-center justify-between gap-1 sm:flex-row sm:gap-4">
                    <h1 className="self-start font-Redhat text-darker sm:self-auto">
                      Last name
                    </h1>
                    <input
                      name="lastName"
                      type="text"
                      className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:w-max sm:max-w-sm"
                      defaultValue={user.lastName!}
                      id="lastName"
                    />
                  </span>

                  <span className="flex w-full max-w-sm flex-col items-center justify-between gap-1 sm:flex-row sm:gap-4">
                    <h1 className="self-start font-Redhat text-darker sm:self-auto">
                      Address
                    </h1>
                    <input
                      defaultValue={user.address!}
                      name="address"
                      className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:w-max sm:max-w-sm"
                      id="address"
                    />
                  </span>
                  <span className="flex w-full max-w-sm justify-between sm:gap-4">
                    <h1 className="font-Redhat text-darker">Gender</h1>
                    <select
                      defaultValue={user.gender!}
                      name="gender"
                      className="h-8 rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                      id="gender"
                    >
                      <option>male</option>
                      <option>female</option>
                      <option>other</option>
                    </select>
                  </span>
                  <span className="flex w-full max-w-sm justify-between gap-4">
                    <h1 className="w-max font-Redhat text-darker">
                      Date of birth
                    </h1>
                    <input
                      name="dateOfBirth"
                      type="date"
                      defaultValue={user.dateOfBirth!}
                      id="dateOfBirth"
                      max={new Date().toISOString().split("T")[0]}
                      className="h-8 rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:max-w-sm"
                    />
                  </span>

                  <div className="mt-4 flex w-full justify-end gap-2">
                    <button
                      className="w-max rounded bg-primary px-3 py-2 text-center text-white active:ring sm:max-w-sm"
                      onClick={HandleFinishSetup}
                    >
                      Finish setup
                    </button>

                    <button
                      className="g w-max rounded px-2 py-2 text-center text-primary hover:bg-gray-100 active:bg-gray-200 sm:max-w-sm"
                      onClick={HandleClear}
                    >
                      Clear
                    </button>
                  </div>
                </section>
              </div>
            </main>
          </div>

          <div
            className="flex h-max w-full justify-center bg-[#393646]"
            id="footerWrapper"
          >
            <FooterComponent withLogoutButton={false} />
          </div>
        </div>
      </>
    );
}
export default Setup;
