import { createContext } from "react";

//object
export const AccountContext = createContext({
  _Id: "",
  Gmail: "",
  Password: "",
  IsLogged: false,
});
