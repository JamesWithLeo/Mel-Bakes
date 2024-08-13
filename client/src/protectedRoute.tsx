import { useSelector } from "react-redux";
import { AppState } from "./store";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const auth = useSelector((state: AppState) => state.auth);
  if (auth.User?.Type === "admin") {
    return children;
  }
  return <Navigate to={"/"} replace={true} />;
}
