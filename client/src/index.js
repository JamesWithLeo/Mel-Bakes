import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./app.js";
import "./index.css";
import ErrorPage from "./Pages/ErrorPage.jsx";
import SignIn from "./Pages/SignIn.jsx";
import Admin from "./Pages/Admin.jsx";
import CartComponent from "./Product/CartComponent.jsx";
import { AuthProvider, ProtectedRoute } from "./authProvider.js";
import Faqs from "./faqsComponents/Faqs.jsx";
import Account from "./Account/Account.jsx";
const route = createBrowserRouter([
  {
    path: "/", element: <App />,
    errorElement: <ErrorPage />,
    loader: () => {
      return { gmail: 'exampleGmail' }

    },
    children: [{ path: "/melbake/mycart", element: <CartComponent /> }]
  },
  { path: "Account", element: <Account /> },
  {
    path: "Admin", element: <ProtectedRoute><Admin /></ProtectedRoute>
  },
  {
    path: "Signin", element: <SignIn />,
  },
  {
    path: "Faqs", element: <Faqs />,
  }
],
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  </React.StrictMode>,
);
