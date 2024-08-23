import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store";
import { Navigate } from "react-router-dom";
import { DeleteAccount, Logout, update } from "../slice/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import plaidPattern from "../assets/images/pattern.svg";
import { useState } from "react";
import {
  faPenToSquare,
  faSquareCheck,
} from "@fortawesome/free-regular-svg-icons";
import Confimation from "../components/confimation";

export default function Account() {
  const user = useSelector((state: AppState) => state.auth.User);
  const dispatch = useDispatch<AppDispatch>();
  const [isEditingFirstName, setEditingFirstName] = useState<boolean>(false);
  const [isEditingLastName, setEditingLastName] = useState<boolean>(false);
  const [isEditingContact, setEditingContact] = useState<boolean>(false);
  const [isEditingAddress, setEditingAddress] = useState<boolean>(false);

  const [isDeleteAccountVisible, setDeleteAccountVisible] =
    useState<boolean>(false);

  const HandleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const FirstName = document.getElementById("FirstName") as HTMLInputElement;
    const LastName = document.getElementById("LastName") as HTMLInputElement;
    const Contact = document.getElementById("Contact") as HTMLInputElement;
    const Address = document.getElementById("Address") as HTMLInputElement;
    switch (e.currentTarget.id) {
      case "FirstNameEdit":
        FirstName.readOnly = false;
        FirstName.focus();
        setEditingFirstName(true);
        setEditingLastName(false);
        setEditingContact(false);
        setEditingAddress(false);
        break;
      case "LastNameEdit":
        LastName.readOnly = false;
        LastName.focus();
        setEditingLastName(true);
        setEditingFirstName(false);
        setEditingContact(false);
        setEditingAddress(false);
        break;
      case "ContactEdit":
        Contact.readOnly = false;
        Contact.focus();
        setEditingContact(true);
        setEditingFirstName(false);
        setEditingLastName(false);
        setEditingAddress(false);
        break;
      case "AddressEdit":
        Address.readOnly = false;
        Address.focus();
        setEditingAddress(true);
        setEditingFirstName(false);
        setEditingLastName(false);
        setEditingContact(false);
        break;
    }
  };

  const HandleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!user) return;
    const FirstName = document.getElementById("FirstName") as HTMLInputElement;
    const LastName = document.getElementById("LastName") as HTMLInputElement;
    const Contact = document.getElementById("Contact") as HTMLInputElement;
    const Address = document.getElementById("Address") as HTMLInputElement;

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
      case "ContactButton":
        dispatch(
          update({ id: user._id, field: "contact", value: Contact.value }),
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
    setEditingContact(false);
    setEditingAddress(false);
  };
  const HandleDeleteAccount = (value: string) => {
    if (user && value)
      dispatch(DeleteAccount({ id: user._id, password: value.trim() }));
    setDeleteAccountVisible(true);
  };

  const HandleLogout = () => {
    dispatch(Logout());
  };
  if (!user) return <Navigate to={"/"} />;
  return (
    <>
      {isDeleteAccountVisible ? (
        <Confimation
          title={"Delete confirmation"}
          context={"Are you sure you want to delete your account?"}
          withInputBox={true}
          label={"Enter your password."}
          icon="danger"
          onConfirm={HandleDeleteAccount}
          closeModal={() => {
            setDeleteAccountVisible(false);
          }}
        />
      ) : null}
      <main className="flex h-full flex-col items-center gap-4">
        <section
          className="mb-8 grid h-36 w-full grid-cols-1 grid-rows-3 flex-col items-center shadow"
          style={{ backgroundImage: `url(${plaidPattern})` }}
        >
          <div className="row-start-3 flex w-full flex-col items-center">
            {user ? (
              <div className="row-start-2 h-28 w-28 bg-white drop-shadow">
                .
              </div>
            ) : (
              <div className="row-start-2 h-28 w-28 bg-white drop-shadow">
                .
              </div>
            )}
          </div>
        </section>
        <div>
          <h1 className="text-sm sm:text-base">
            {user.firstName} {user.lastName}
          </h1>
          <h1 className="text-xs">{user._id}</h1>
        </div>

        <section className="flex w-full flex-col items-center gap-4 px-2 lg:flex-row lg:items-start lg:justify-center">
          <section className="flex w-full max-w-sm flex-col items-center gap-2 rounded bg-white p-4 shadow md:p-8">
            <div className="flex w-full flex-col">
              <label className="text-sm text-blue-900">Email</label>
              <span className="flex w-full items-center gap-4">
                <input
                  readOnly
                  defaultValue={user.email}
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
                  defaultValue={user.firstName}
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
                  defaultValue={user.lastName}
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
              <label className="text-sm text-darker">Contact Number</label>
              <span className="flex items-center gap-4">
                <input
                  readOnly
                  id="Contact"
                  defaultValue={user.contact}
                  className="w-full border-b border-gray-100 text-gray-700 outline-none focus:border-gray-500"
                />
                <button id="ContactEdit" onClick={HandleEdit}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-gray-500"
                  />
                </button>
                {isEditingContact ? (
                  <button onClick={HandleSubmit} id="ContactButton">
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
                  defaultValue={user.address}
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

              <button
                className="w-max rounded-md bg-red-400 px-3 py-1 align-middle text-sm text-gray-300 hover:text-white hover:shadow-lg hover:shadow-red-400"
                id="logoutButton"
                onClick={HandleLogout}
              >
                Log out
              </button>
            </section>
          </section>
        </section>
      </main>
    </>
  );
}
