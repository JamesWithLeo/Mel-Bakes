// import HeaderComponent from "../Header/Header";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { AppState } from "../store";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDatabase,
  faEnvelopeOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const queryClient = new QueryClient();

function Admin() {
  const User = useSelector((state: AppState) => state.auth.User);
  const [isAsideVisible, setIsAsideVisible] = useState<boolean>(false);
  document.body.style.overflowY = "scroll";

  if (User && User.role !== "admin") {
    return <Navigate to={"/"} />;
  }

  return (
    <main className="flex h-dvh max-h-max w-full flex-col items-center">
      <header className="sticky z-10 flex h-16 w-full flex-col items-center justify-center bg-primary py-2 lg:hidden lg:py-4">
        <div className="flex h-16 w-full max-w-7xl items-center justify-between px-4">
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
      <main className="flex h-full w-full max-w-7xl bg-primary">
        {isAsideVisible === true ? (
          <>
            <div
              className="fixed z-10 h-dvh w-full"
              onClick={() => {
                setIsAsideVisible(false);
              }}
            />
            <div className="top-15 absolute right-0 z-10 flex h-max w-max flex-col gap-2 bg-gray-500 bg-opacity-80 px-4 py-4 text-center text-white lg:hidden">
              <Link
                to={"new"}
                className="flex w-full items-center gap-2 border-primarylight px-6 text-center text-sm text-white"
              >
                <FontAwesomeIcon icon={faEnvelopeOpen} />
                New
              </Link>
              <h1 className="flex w-full items-center gap-2 border-primarylight px-6 text-center text-sm text-white">
                <FontAwesomeIcon icon={faDatabase} />
                Database
              </h1>
              <NavLink
                to={"products"}
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive
                      ? "w-full py-2 text-white"
                      : "w-full bg-transparent py-2 text-gray-300",
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
                      ? "w-full py-2 text-white"
                      : "w-full bg-transparent py-2 text-gray-300",
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
                      ? "w-full py-2 text-white"
                      : "w-full bg-transparent py-2 text-gray-300",
                  ].join(" ")
                }
              >
                Orders
              </NavLink>
            </div>
          </>
        ) : null}

        <div className="hidden h-max w-1/6 flex-col items-center justify-center gap-2 py-8 lg:flex">
          <Link
            to={"/"}
            target="_parent"
            className="font-[Lobster] text-3xl text-white"
          >
            Mel Bakes
          </Link>
          <Link
            to={"new"}
            className="mt-16 flex w-full items-center gap-2 border-primarylight px-6 text-center text-sm text-white"
          >
            <FontAwesomeIcon icon={faEnvelopeOpen} />
            New
          </Link>
          <h1 className="flex w-full items-center gap-2 border-primarylight px-6 text-center text-sm text-primarylight">
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
                    : "text- w-full bg-transparent py-2 text-white",
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
                    : "w-full bg-transparent py-2 text-white",
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
                    : "w-full bg-transparent py-2 text-white",
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
