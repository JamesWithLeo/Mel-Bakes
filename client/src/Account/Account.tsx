import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store";

export default function Account() {
  const auth = useSelector((state: AppState) => state.auth);
  useEffect(() => {
    async function fetchAccount() {
      await fetch("/melbake/profile/" + auth.User?._id).then((response) => {
        response.json().then((Account) => {});
      });
    }
  }, []);
  return (
    <div className="h-dvh w-full">
      <h1>Account</h1>
      {auth.User ? (
        <>
          <h1>
            {auth.User.FirstName} {auth.User.LastName}
          </h1>
          <h1>{auth.User._id}</h1>
          <h1>{auth.User.Gmail}</h1>
          <h1>{auth.User.Password}</h1>
        </>
      ) : null}
    </div>
  );
}
