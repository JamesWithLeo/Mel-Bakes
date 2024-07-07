import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, BrowserRouter } from "react-router-dom";

import App from "./app.js";
import "./index.css";
import ErrorPage from "./Pages/ErrorPage.jsx";
import SignIn from "./Pages/SignIn.jsx";
import Admin from "./Pages/Admin.jsx";
import CartComponent from "./Product/CartComponent.jsx";


const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: () => {
      return { isAuth: true }
    },
    children: [{ path: "/melbake/mycart", element: <CartComponent /> }]
  },
  { path: "Admin/", element: <Admin /> },
  {
    path: "Signin/",
    element:
      <SignIn />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
);
