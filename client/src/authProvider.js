import React from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = React.createContext();

export const useAuth = () => {
  // the state will be true if, user already login. else false
  const [user, setUser] = React.useState(localStorage.getItem("authed") ?? false);
  const [userType, setUserType] = React.useState(sessionStorage.getItem("userType" ?? "Quest"));

  async function Login(id, userType) {
    localStorage.setItem("id", id);
    sessionStorage.setItem("userType", userType)
    localStorage.setItem("authed", "true");
    setUserType(userType)
    setUser(true);
  };

  // call this function to sign out logged in user
  async function Logout() {
    localStorage.removeItem("id");
    sessionStorage.removeItem("userType");
    localStorage.removeItem("authed");
    setUserType(null);
    setUser(false);
  };

  return { user, userType, Login, Logout }
};

export function AuthProvider({ children }) {
  const auth = useAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
export function ProtectedRoute({ children }) {
  let Auth = useAuth()
  if (Auth.user && (Auth.userType === "Admin")) {
    return children
  } else {
    return <Navigate to={"/"} />
  }
}


export const AuthConsumer = () => {
  return React.useContext(AuthContext);
};