import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

import App from "./app";
import "./index.css";
import ErrorPage from "./components/ErrorPage";
import Admin from "./admin.components/Admin";
import ModalCart from "./cart.components/modalCart";
import CustomerService from "./components/CustomerService";
import { store } from "./store";
import AccountDashboard from "./admin.components/acccountDashboard";
import ProductDashboard from "./admin.components/productDashboard";
import OrderDashboard from "./admin.components/orderDashboard";
import Cart from "./order.components/cart";
import Orders from "./order.components/Orders";
import DeliveryLayout from "./delivery.components/deliveryLayout";
import Account from "./account.components/account";
import OrderLayout from "./order.components/ordersLayout";
import RecievedLayout from "./order.components/recievedLayout";
import SignPage from "./login-signin/sign";
import LoginPage from "./login-signin/Login";
import ForgetLayout from "./components/forgetLayout";
import Dashboard from "./admin.components/dashboard";
const queryClient = new QueryClient();
const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/minicart",
        element: (
          <QueryClientProvider client={queryClient}>
            <ModalCart />
          </QueryClientProvider>
        ),
      },
    ],
  },
  {
    path: "account",
    element: (
      <QueryClientProvider client={queryClient}>
        <Account />
      </QueryClientProvider>
    ),
  },
  {
    path: "admin",
    element: <Admin />,

    children: [
      {
        index: true,
        element: (
          <div className="flex h-full flex-col items-center justify-center text-4xl text-gray-300">
            <FontAwesomeIcon icon={faCode} />
          </div>
        ),
      },
      { path: "new", element: <Dashboard /> },
      { path: "accounts", element: <AccountDashboard /> },
      { path: "products", element: <ProductDashboard /> },
      { path: "orders", element: <OrderDashboard /> },
    ],
  },
  {
    path: "Signin",
    element: <SignPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "forget",
    element: <ForgetLayout />,
  },
  {
    path: "order",
    element: (
      <QueryClientProvider client={queryClient}>
        <OrderLayout />
      </QueryClientProvider>
    ),
    children: [
      {
        path: "cart",
        element: <Cart />,
      },

      { path: "order", element: <Orders /> },
      { path: "recieved", element: <RecievedLayout /> },
    ],
  },
  {
    path: "deliver",
    element: (
      <QueryClientProvider client={queryClient}>
        <DeliveryLayout />
      </QueryClientProvider>
    ),
  },
  {
    path: "service",
    element: <CustomerService />,
  },
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
