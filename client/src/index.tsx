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
import LoginSigninLayout from "./login-signin/loginSigninLayout";
import Admin from "./admin.components/Admin";
import ModalCart from "./cart.components/modalCart";
import Info from "./components/info";
import AccountLayout from "./account.components/accountLayout";
import { store } from "./store";
import ProtectedRoute from "./protectedRoute";
import AccountDashboard from "./admin.components/acccountDashboard";
import ProductDashboard from "./admin.components/productDashboard";
import OrderDashboard from "./admin.components/orderDashboard";
import Cart from "./order.components/cart";
import Orders from "./order.components/Orders";
import DeliveryLayout from "./delivery.components/deliveryLayout";
import Account from "./account.components/account";
import OrderLayout from "./order.components/ordersLayout";
import RecievedLayout from "./order.components/recievedLayout";

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
        <ProtectedRoute>
          <AccountLayout />
        </ProtectedRoute>
      </QueryClientProvider>
    ),
    children: [
      { index: true, element: <Account /> },
      { path: "info", element: <Account /> },
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
    element: <LoginSigninLayout />,
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
    path: "Faqs",
    element: <Info />,
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
