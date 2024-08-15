import { useSelector } from "react-redux";
import { AppState } from "../store";
import { Navigate } from "react-router-dom";

export default function Account() {
  // useLayoutEffect(() => {
  //   async function fetchAccount() {
  //     await fetch("/melbake/profile/" + auth.User?._id).then((response) => {
  //       response.json().then((Account) => {});
  //     });
  //   }
  // }, []);

  const auth = useSelector((state: AppState) => state.auth);
  if (!auth.User) {
    return <Navigate to={"/"} replace />;
  }

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
        </>
      ) : null}
    </div>
  );
}
