import { useContext, createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const Auth = () => {
  const [user, setUser] = useState(true);
  // const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async () => {
    setUser(true);
    // navigate("/profile");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(false);
    // navigate("/", { replace: true });
  };

  // const value = useMemo(
  //   () => ({
  //     user,
  //     login,
  //     logout,
  //   }),
  //   [user]
  // )
  return { user, login, logout }
};

export function AuthProvider({ children }) {
  let auth = Auth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = () => {
  return useContext(AuthContext);
};