import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./app";
import "./index.css";
import ErrorPage from "./Pages/ErrorPage";
import SignIn from "./Pages/SignIn";
import Admin from "./Pages/Admin";
import CartComponent from "./Product/CartComponent";
import { AuthProvider } from "./authProvider.js";
import Faqs from "./faqsComponents/Faqs";
import Account from "./Account/Account";
import Orders from "./orders.component/Orders";
import { Provider } from "react-redux";
import { store } from "./store";
import ProtectedRoute from "./protectedRoute";
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    shouldRevalidate: ({ currentUrl, currentParams }) => {
      console.log("revalidated, react-router");
      return currentUrl.pathname === "/cart";
    },
    children: [{ path: "/cart", element: <CartComponent /> }],
  },
  { path: "Account", element: <Account /> },
  {
    path: "Admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "Signin",
    element: <SignIn />,
  },
  {
    path: "Faqs",
    element: <Faqs />,
  },
  { path: "Orders", element: <Orders /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={route} />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
);
