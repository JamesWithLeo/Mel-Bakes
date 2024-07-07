import { useContext, createContext, useState } from "react";

const AuthContext = createContext(true);

export default function AuthProvider({ children }) {

}
export function UseAuth() {
  return useContext(AuthContext);
}