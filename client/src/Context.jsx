import { createContext } from "react";

//object
export const AccountContext = createContext({
  Username: "",
  Gmail: "",
  Password: "",
  IsLogged: false,
});
