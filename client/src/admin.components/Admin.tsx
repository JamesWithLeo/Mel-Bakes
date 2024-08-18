// import HeaderComponent from "../Header/Header";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { AppState } from "../store";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const queryClient = new QueryClient();

function Admin() {
  const User = useSelector((state: AppState) => state.auth.User);
  const [isAsideVisible, setIsAsideVisible] = useState<boolean>(false);
  if (User && User.Type !== "admin") {
    return <Navigate to={"/"} />;
  }
  document.body.style.overflowY = "scroll";

  return (
    <main className="flex h-dvh max-h-max w-full flex-col items-center">
      <header className="sticky z-10 flex h-16 w-full flex-col items-center justify-center bg-primary py-2 lg:hidden lg:py-4">
        <div className="flex h-full w-full max-w-7xl items-center justify-between px-4">
          <Link
            to={"/"}
            target="_parent"
            className="font-[Lobster] text-3xl text-white"
          >
            Mel Bakes
          </Link>
          <button
            className="text-xl text-white lg:hidden"
            onClick={() => {
              setIsAsideVisible(!isAsideVisible);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </header>
      <main className="flex h-full w-full max-w-7xl bg-primarylight">
        {isAsideVisible === true ? (
          <>
            <div
              className="fixed z-10 h-dvh w-full"
              onClick={() => {
                setIsAsideVisible(false);
              }}
            />
            <div className="top-15 absolute right-0 z-10 flex h-max w-max flex-col gap-2 bg-gray-500 bg-opacity-80 py-4 text-white lg:hidden">
              <NavLink to={"products"} className={"w-full px-4"}>
                Product
              </NavLink>
              <NavLink to={"accounts"} className={"w-full px-4"}>
                Account
              </NavLink>
              <NavLink to={"orders"} className={"w-full px-4"}>
                Order
              </NavLink>
            </div>
          </>
        ) : null}

        <div className="hidden h-max w-1/6 flex-col items-center justify-center gap-2 py-8 lg:flex">
          <Link
            to={"/"}
            target="_parent"
            className="font-[Lobster] text-3xl text-primary"
          >
            Mel Bakes
          </Link>
          <h1 className="mt-12 flex w-full items-center gap-2 border-primarylight px-6 text-center text-sm text-primary">
            <FontAwesomeIcon icon={faDatabase} />
            Database
          </h1>
          <aside
            id="adminAside"
            className="flex w-full flex-col text-center text-xs"
          >
            <NavLink
              to={"products"}
              className={({ isActive, isPending, isTransitioning }) =>
                [
                  isActive
                    ? "w-full bg-secondarylight py-2 text-primary"
                    : "w-full bg-transparent py-2",
                ].join(" ")
              }
            >
              {" "}
              Product
            </NavLink>
            <NavLink
              to={"accounts"}
              className={({ isActive, isPending, isTransitioning }) =>
                [
                  isActive
                    ? "w-full bg-secondarylight py-2 text-primary"
                    : "w-full bg-transparent py-2",
                ].join(" ")
              }
            >
              Account
            </NavLink>
            <NavLink
              to={"Orders"}
              className={({ isActive, isPending, isTransitioning }) =>
                [
                  isActive
                    ? "w-full bg-secondarylight py-2 text-primary"
                    : "w-full bg-transparent py-2",
                ].join(" ")
              }
            >
              Orders
            </NavLink>
          </aside>
        </div>

        <div className="h-full w-full bg-white lg:w-10/12">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </main>
    </main>
  );
}
export default Admin;
