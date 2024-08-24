import { useNavigate } from "react-router-dom";
import { logoutUser } from "../firebase";

export default function LogutButton() {
  const navigate = useNavigate();
  const HandleLogout = () => {
    logoutUser();
    navigate("/", { replace: true });
    window.location.reload();
  };
  return (
    <button
      className="w-max rounded-md bg-red-400 px-3 py-1 align-middle text-sm text-gray-300 hover:text-white hover:shadow-lg hover:shadow-red-400"
      id="logoutButton"
      onClick={HandleLogout}
    >
      Log out
    </button>
  );
}
