import { createContext } from "react";

class Account {
  constructor(_username, _gmail, _password) {
    this.Username = _username;
    this.Gmail = _gmail;
    this.Password = _password;
  }
  getUser() {
    return this.Username;
  }
  getGmail() {
    return this.Gmail;
  }
  getPassword() {
    return this.Password;
  }
}

//object
export const AccountContext = createContext({
  Username: "",
  Gmail: "",
  Password: "",
  IsLogged: false,
});

// export const cartDisplayContext = createContext(true)
