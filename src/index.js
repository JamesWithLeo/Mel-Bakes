import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./Account/SignIn.jsx";

const route = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "Signin/", element: <SignIn /> },
]);

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
);
