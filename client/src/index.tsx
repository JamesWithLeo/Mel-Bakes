import * as React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

import App from "./app";
import "./index.css";
import ErrorPage from "./components/ErrorPage";
import SignIn from "./login-signin/SignIn";
import Admin from "./admin.components/admin";
import ModalCart from "./Product/modalCart";
import Faqs from "./components/Faqs";
import Account from "./account.components/account";
import Orders from "./orders.component/Orders";
import { store } from "./store";
import ProtectedRoute from "./protectedRoute";
import AccountDashboard from "./admin.components/acccountDashboard";
import ProductDashboard from "./admin.components/productDashboard";
import OrderDashboard from "./admin.components/orderDashboard";
import Cart from "./account.components/cart";

const cartQuery = new QueryClient();
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: async () => {
      return axios.get("/melbake").then((res) => {
        console.log(res.data);
        return res.data;
      });
    },
    children: [
      {
        path: "/minicart",
        element: (
          <QueryClientProvider client={cartQuery}>
            <ModalCart />
          </QueryClientProvider>
        ),
      },
    ],
  },
  {
    path: "account",
    element: (
      <ProtectedRoute>
        <Account />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "cart",
        element: (
          <QueryClientProvider client={cartQuery}>
            <Cart />
          </QueryClientProvider>
        ),
      },
      { path: "favorites", element: <div>fav</div> },
      { path: "order", element: <div>order</div> },
      { path: "recieved", element: <div>recieved</div> },
      { path: "cancelled", element: <div>cancelled</div> },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: (
          <div className="flex h-full flex-col items-center justify-center text-4xl text-gray-300">
            <FontAwesomeIcon icon={faCode} />
          </div>
        ),
      },
      { path: "accounts", element: <AccountDashboard /> },
      { path: "products", element: <ProductDashboard /> },
      { path: "orders", element: <OrderDashboard /> },
    ],
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
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>,
);
