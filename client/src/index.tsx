import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./app";
import "./index.css";
import ErrorPage from "./Pages/ErrorPage";
import SignIn from "./Pages/SignIn";
import Admin from "./admin.components/Admin";
import CartComponent from "./Product/CartComponent";
import Faqs from "./faqsComponents/Faqs";
import Account from "./Account/Account";
import Orders from "./orders.component/Orders";
import { Provider } from "react-redux";
import { store } from "./store";
import ProtectedRoute from "./protectedRoute";
import axios from "axios";
import AccountDashboard from "./admin.components/acccountDashboard";
import ProductDashboard from "./admin.components/productDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import OrderDashboard from "./admin.components/orderDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const cartQuery = new QueryClient();
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: async () => {
      return axios.get("melbake").then((res) => {
        return res.data;
      });
    },
    shouldRevalidate: ({ currentUrl, currentParams }) => {
      console.log("revalidated, react-router");
      return currentUrl.pathname === "/cart";
    },
    children: [
      {
        path: "/cart",
        element: (
          <QueryClientProvider client={cartQuery}>
            <CartComponent />
          </QueryClientProvider>
        ),
      },
    ],
  },
  {
    path: "Account",
    element: (
      <ProtectedRoute>
        <Account />
      </ProtectedRoute>
    ),
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
