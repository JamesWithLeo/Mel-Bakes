import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store";
import { Navigate, useNavigate } from "react-router-dom";
import {
  DeleteAccount,
  SetDisplayName,
  SetPhoneNumber,
  update,
} from "../slice/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  auth,
  CreatePhoneAuthProvider,
  CreateRecaptchaVerifier,
  deleteUserAccount,
  loginUser,
  updateUserPhoneNumber,
} from "../firebase";
import plaidPattern from "../assets/images/pattern.svg";
import { useEffect, useState } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import {
  faPenToSquare,
  faSquareCheck,
} from "@fortawesome/free-regular-svg-icons";
import Confimation from "../components/confimation";
import { updateUserNameAndPhoto } from "../firebase";
import LogutButton from "../components/LogoutButton";
import FooterComponent from "../components/Footer";
import HeaderComponent from "../components/Header";
import Notify from "../components/notify";

declare global {
  interface Window {
    grecaptcha?: typeof grecaptcha;
    recaptchaVerifier: RecaptchaVerifier;
  }
}
export default function Account() {
  const user = useSelector((state: AppState) => state.auth.User);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isEditingFirstName, setEditingFirstName] = useState<boolean>(false);
  const [isEditingLastName, setEditingLastName] = useState<boolean>(false);
  const [isEditingAddress, setEditingAddress] = useState<boolean>(false);
  const [isEditingDisplayName, setEditingDisplayName] =
    useState<boolean>(false);
  const [isDeleteAccountVisible, setDeleteAccountVisible] =
    useState<boolean>(false);

  const [notificaton, setNotification] = useState<string>("");
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] =
    useState<boolean>(false);
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verficationId, setVerificationId] = useState<string>("");
  const [phoneCodeError, setPhoneCodeError] = useState<string>("");

  const HandleCancelPhoneVerification = () => {
    const phoneNumber = document.getElementById(
      "phoneNumber",
    ) as HTMLInputElement;
    phoneNumber.value = phoneNumber.defaultValue;
    phoneNumber.readOnly = true;

    document.body.style.overflowY = "scroll";
    setIsEditingPhoneNumber(false);
    setPhoneNumber("");
    setVerificationId("");
    window.grecaptcha.reset();
  };

  const HandleSavePhoneNumber = async () => {
    const phoneNumberElement = document.getElementById(
      "phoneNumber",
    ) as HTMLInputElement;
    setPhoneNumber(phoneNumberElement.value);
    if (phoneNumberElement.value === phoneNumberElement.defaultValue) return;
    if (!user?.email || !phoneNumberElement.value || !recaptchaVerifier) {
      phoneNumberElement.value = phoneNumberElement.defaultValue;
      return;
    }
    const provider = CreatePhoneAuthProvider();
    await provider
      .verifyPhoneNumber(phoneNumberElement.value, recaptchaVerifier)
      .then((verfication) => {
        console.log("Verification Id: ", verfication);
        setVerificationId(verfication);
        document.body.style.overflowY = "hidden";
      })
      .catch((error) => {
        setNotification(error.code);
        document.body.style.overflowY = "hidden";
        setTimeout(() => {
          setNotification("");
          document.body.style.overflowY = "scroll";
        }, 3000);
      });
  };

  const SendVerificationCodePhoneNumber = () => {
    const verificationCode = document.getElementById(
      "verificationCode",
    ) as HTMLInputElement;
    const recaptchaContainer = document.getElementById("recaptcha-container");
    if (!verificationCode.value || !recaptchaContainer) return;
    updateUserPhoneNumber(verficationId, verificationCode.value)
      .then(() => {
        dispatch(SetPhoneNumber(phoneNumber));
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        if (error.code) setPhoneCodeError(error.code);
      });
  };

  const HandleRenderCaptcha = () => {
    const recaptchaContainer = document.getElementById("recaptcha-container");
    if (recaptchaVerifier && recaptchaContainer?.innerHTML) {
      recaptchaVerifier.verify();
      return;
    }

    function HandleCaptchaSolve(response: any) {
      console.log("reCAPTCHA solved:", response);
      const phoneNumber = document.getElementById(
        "phoneNumber",
      ) as HTMLInputElement;
      phoneNumber.readOnly = false;
      phoneNumber.focus();
      setIsEditingPhoneNumber(true);
    }
    function HandleExpireCaptcha() {
      console.log("reCAPTCHA expired");
    }

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = CreateRecaptchaVerifier(
        HandleCaptchaSolve,
        HandleExpireCaptcha,
      );
      window.recaptchaVerifier.render().then((widgetId: number) => {
        console.log("reCAPTCHA rendered with widgetId:", widgetId);
      });
    }
    setRecaptchaVerifier(window.recaptchaVerifier);
  };

  const HandleEditDisplayName = () => {
    const DisplayName = document.getElementById(
      "DisplayName",
    ) as HTMLInputElement;
    DisplayName.readOnly = false;
    DisplayName.focus();
    setEditingDisplayName(true);
  };

  const HandleSaveDisplayName = () => {
    const DisplayName = document.getElementById(
      "DisplayName",
    ) as HTMLInputElement;
    if (DisplayName.value !== DisplayName.defaultValue) {
      updateUserNameAndPhoto({ DisplayName: DisplayName.value });
      dispatch(SetDisplayName(DisplayName.value));
      DisplayName.readOnly = true;
      setEditingDisplayName(false);
    }
  };

  const HandleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const FirstName = document.getElementById("FirstName") as HTMLInputElement;
    const LastName = document.getElementById("LastName") as HTMLInputElement;
    const Address = document.getElementById("Address") as HTMLInputElement;
    const DisplayName = document.getElementById(
      "DisplayName",
    ) as HTMLInputElement;
    switch (e.currentTarget.id) {
      case "DisplayNameEdit":
        DisplayName.readOnly = false;
        DisplayName.focus();
        setEditingDisplayName(true);
        setEditingFirstName(false);
        setEditingLastName(false);
        setEditingAddress(false);
        break;
      case "FirstNameEdit":
        FirstName.readOnly = false;
        FirstName.focus();
        setEditingFirstName(true);
        setEditingLastName(false);
        setEditingAddress(false);
        break;
      case "LastNameEdit":
        LastName.readOnly = false;
        LastName.focus();
        setEditingLastName(true);
        setEditingFirstName(false);
        setEditingAddress(false);
        break;
      case "AddressEdit":
        Address.readOnly = false;
        Address.focus();
        setEditingAddress(true);
        setEditingFirstName(false);
        setEditingLastName(false);
        break;
    }
  };

  const HandleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!user) return;
    const FirstName = document.getElementById("FirstName") as HTMLInputElement;
    const LastName = document.getElementById("LastName") as HTMLInputElement;
    const Address = document.getElementById("Address") as HTMLInputElement;
    if (!user._id) return;
    switch (e.currentTarget.id) {
      case "FirstNameButton":
        dispatch(
          update({ id: user._id, field: "firstName", value: FirstName.value }),
        );
        break;
      case "LastNameButton":
        dispatch(
          update({ id: user._id, field: "lastName", value: LastName.value }),
        );
        break;
      case "AddressButton":
        dispatch(
          update({ id: user._id, field: "address", value: Address.value }),
        );
        break;
    }

    setEditingFirstName(false);
    setEditingLastName(false);
    setEditingAddress(false);
  };

  const HandleDeleteAccount = (value: string | undefined) => {
    if (!user?.email || !value) return;
    const password = value;
    const response = loginUser(user.email, password);
    response
      .then((value) => {
        if (!value.uid || !value.email || !user._id) return;
        deleteUserAccount();
        dispatch(
          DeleteAccount({
            id: user._id,
            firebaseId: value.uid,
            email: value.email,
          }),
        )
          .unwrap()
          .then(() => {
            document.body.style.overflowY = "scroll";
            navigate("/", { replace: true });
          })
          .catch(() => {
            setNotification("failed to delete account");
          });
        setDeleteAccountVisible(true);
      })
      .catch((reason) => {
        console.log(reason);
        setNotification(reason);
      });
    setTimeout(() => {
      setNotification("");
    }, 4000);
  };

  useEffect(() => {
    HandleRenderCaptcha();
  }, []);

  if (!user) return <Navigate to={"/"} />;

  return (
    <>
      {notificaton ? (
        <>
          <div className="fixed z-20 h-screen w-full bg-primary bg-opacity-70" />
          <div className="fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 shadow">
            <Notify text={notificaton} type={"danger"} />
          </div>
        </>
      ) : null}
      {isDeleteAccountVisible ? (
        <Confimation
          title={"Delete confirmation"}
          context={"Are you sure you want to delete your account?"}
          label={"Enter your password."}
          icon="danger"
          modalType="text"
          onConfirm={HandleDeleteAccount}
          closeModal={() => {
            setDeleteAccountVisible(false);
          }}
        />
      ) : null}
      {verficationId ? (
        <>
          <div className="fixed z-10 h-screen w-full bg-primary opacity-70" />
          <div className="fixed left-1/2 top-1/2 z-10 flex w-full max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg bg-white px-8 py-8">
            <h1 className="my-2 text-center text-xl font-bold text-primary lg:text-2xl">
              Verification Code
            </h1>
            <h1 className="font-raleway">
              Please enter the six digit code that is sent to your number.
            </h1>
            <h1 className="text-center text-sm text-red-400">
              {phoneCodeError}
            </h1>
            <input
              placeholder="ex: 123456"
              id="verificationCode"
              className="h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500"
            />
            <span className="flex gap-2 self-end font-Redhat">
              <button
                onClick={HandleCancelPhoneVerification}
                className="rounded px-2 py-1 hover:bg-gray-100"
              >
                cancel
              </button>
              <button
                onClick={SendVerificationCodePhoneNumber}
                className="rounded bg-primary px-2 py-1 text-white"
              >
                send
              </button>
            </span>
          </div>
        </>
      ) : null}

      <div id="recaptcha-container" className=""></div>
      <main className="flex h-full flex-col items-center bg-gradient-to-b from-secondarylight to-primarylight">
        <section className="flex w-full flex-col items-center bg-secondarylight shadow drop-shadow">
          <HeaderComponent withNavigation={false} />
        </section>

        <section
          className="mb-4 grid h-36 w-full grid-cols-1 grid-rows-3 flex-col items-center shadow"
          style={{ backgroundImage: `url(${plaidPattern})` }}
        >
          <div className="row-start-2 flex flex-col items-center">
            <span className="flex justify-between gap-4">
              <input
                id="DisplayName"
                defaultValue={user.displayName ?? ""}
                readOnly
                className="w-full border-b border-primary text-center text-sm text-gray-600 shadow outline-none focus:border-gray-500"
              />

              {isEditingDisplayName ? (
                <button onClick={HandleSaveDisplayName} id="DisplayNameButton">
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    className="text-gray-500"
                  />
                </button>
              ) : (
                <button onClick={HandleEditDisplayName} id="DisplayNameEdit">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-gray-500"
                  />
                </button>
              )}
            </span>
            <h1 className="text-center text-xs font-light">{user._id}</h1>
          </div>
        </section>

        <section className="flex w-full flex-col items-center gap-4 px-2 py-8 lg:flex-row lg:items-start lg:justify-center">
          <section className="flex w-full max-w-sm flex-col items-center gap-2 rounded bg-white p-4 shadow md:p-8">
            <div className="flex w-full flex-col">
              <label className="text-sm text-blue-900">Email</label>
              <span className="flex w-full items-center gap-4">
                <input
                  readOnly
                  defaultValue={user.email ?? ""}
                  className="w-full border-b border-gray-100 text-gray-600 outline-none focus:border-gray-500"
                />
              </span>
            </div>

            <div className="flex w-full flex-col">
              <label className="text-sm text-blue-900">First name</label>
              <span className="flex w-full items-center gap-4">
                <input
                  id="FirstName"
                  readOnly
                  defaultValue={user.firstName ?? ""}
                  className="w-full border-b border-gray-100 text-gray-700 outline-none focus:border-gray-500"
                />
                <button id="FirstNameEdit" onClick={HandleEdit}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-gray-500"
                  />
                </button>
                {isEditingFirstName ? (
                  <button onClick={HandleSubmit} id="FirstNameButton">
                    <FontAwesomeIcon
                      icon={faSquareCheck}
                      className="text-gray-500"
                    />
                  </button>
                ) : null}
              </span>
            </div>
            <div className="flex w-full flex-col">
              <label className="text-sm text-darker">Last name</label>
              <span className="flex flex-1 items-center gap-4">
                <input
                  readOnly
                  id="LastName"
                  defaultValue={user.lastName ?? ""}
                  className="w-full border-b border-gray-100 text-gray-700 outline-none focus:border-gray-500"
                />
                <button id="LastNameEdit" onClick={HandleEdit}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-gray-500"
                  />
                </button>
                {isEditingLastName ? (
                  <button onClick={HandleSubmit} id="LastNameButton">
                    <FontAwesomeIcon
                      icon={faSquareCheck}
                      className="text-gray-500"
                    />
                  </button>
                ) : null}
              </span>
            </div>

            <div className="flex w-full flex-col">
              <span className="flex items-center gap-1">
                <label className="text-sm text-darker">Phone Number</label>
                {!user.phoneNumber ? (
                  <h1 className="text-xs text-red-400 underline underline-offset-1">
                    required to purchase cupcakes.
                  </h1>
                ) : null}
              </span>
              <span className="flex items-center gap-4">
                <input
                  id="phoneNumber"
                  readOnly
                  defaultValue={auth.currentUser?.phoneNumber ?? ""}
                  className="w-full border-b border-gray-100 text-gray-700 outline-none focus:border-gray-500"
                />
                <button id="phoneNumberEdit" onClick={HandleRenderCaptcha}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-gray-500"
                  />
                </button>
                {isEditingPhoneNumber ? (
                  <button onClick={HandleSavePhoneNumber}>
                    <FontAwesomeIcon
                      icon={faSquareCheck}
                      className="text-gray-500"
                    />
                  </button>
                ) : null}
              </span>
            </div>

            <div className="flex w-full flex-col">
              <label className="text-sm text-darker">Address</label>
              <span className="flex items-center gap-4">
                <input
                  readOnly
                  id="Address"
                  defaultValue={user.address ?? ""}
                  className="w-full border-b border-gray-100 text-gray-700 outline-none focus:border-gray-500"
                />
                <button onClick={HandleEdit} id="AddressEdit">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-gray-500"
                  />
                </button>
                {isEditingAddress ? (
                  <button onClick={HandleSubmit} id="AddressButton">
                    <FontAwesomeIcon
                      icon={faSquareCheck}
                      className="text-gray-500"
                    />
                  </button>
                ) : null}
              </span>
            </div>
          </section>

          <section className="flex w-full max-w-sm flex-col gap-2">
            <section className="flex h-max w-full max-w-sm flex-col items-center gap-2 rounded bg-white p-4 shadow md:p-8">
              <div className="flex w-full items-center justify-between">
                <label className="align-middle text-sm">Prefered service</label>
                <select
                  className="px-2 py-1 text-darker"
                  defaultValue={"Paypal"}
                >
                  <option>Pick up</option>
                  <option>Deliver</option>
                </select>
              </div>

              <div className="flex w-full items-center justify-between">
                <label className="align-middle text-sm">Payment Method</label>
                <select
                  className="px-2 py-1 text-darker"
                  defaultValue={"Paypal"}
                >
                  <option>Gcash</option>
                  <option>Paypal</option>
                </select>
              </div>
            </section>
            <section className="flex w-full max-w-sm flex-col items-end gap-2 rounded p-4">
              <button className="hover:shadowd-darker w-max rounded-md bg-darker px-3 py-1 align-middle text-sm text-gray-200 hover:text-white hover:shadow-lg">
                Forgot Password
              </button>
              <button
                className="w-max rounded-md bg-red-400 px-3 py-1 align-middle text-sm text-gray-200 hover:text-white hover:shadow-lg hover:shadow-red-400"
                onClick={() => {
                  setDeleteAccountVisible(true);
                }}
              >
                Delete Account
              </button>
              <LogutButton />
            </section>
          </section>
        </section>

        <FooterComponent withLogoutButton={false} />
      </main>
    </>
  );
}
