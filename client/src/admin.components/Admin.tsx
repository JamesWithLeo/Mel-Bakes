// import HeaderComponent from "../Header/Header";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";

import plaidPattern from "../assets/images/pattern.svg";
import { useSelector } from "react-redux";
import { AppState } from "../store";

function Admin() {
  const User = useSelector((state: AppState) => state.auth.User);

  if (User && User.Type !== "admin") {
    return <Navigate to={"/"} />;
  }
  document.body.style.overflowY = "scroll";

  return (
    <main
      className="flex h-dvh max-h-max w-full flex-col items-center"
      style={{ backgroundImage: `url(${plaidPattern})` }}
    >
      <header className="sticky z-10 flex w-full flex-col items-center justify-center bg-primary py-2 lg:py-4">
        <div className="flex h-full w-full max-w-7xl items-center px-4">
          <Link
            to={"/"}
            target="_parent"
            className="font-[Lobster] text-3xl text-white"
          >
            Mel Bakes
          </Link>
        </div>
      </header>
      <main className="flex h-full w-full max-w-7xl bg-[#a6b1e1]">
        <div className="justify-cente flex h-max w-1/3 flex-col items-center gap-2">
          <h1 className="my-4 text-2xl text-primary">Admin</h1>
          <aside
            id="adminAside"
            className="flex w-full flex-col text-center text-xs"
          >
            <NavLink
              to={"product/"}
              className={({ isActive, isPending, isTransitioning }) =>
                [
                  isActive
                    ? "w-full bg-white py-2 text-primary"
                    : "w-full bg-transparent py-2 text-white",
                ].join(" ")
              }
            >
              {" "}
              Product
            </NavLink>
            <NavLink
              to={"account"}
              className={({ isActive, isPending, isTransitioning }) =>
                [
                  isActive
                    ? "w-full bg-white py-2 text-primary"
                    : "w-full bg-transparent py-2 text-white",
                ].join(" ")
              }
            >
              Account
            </NavLink>
          </aside>
        </div>

        <div className="w-full bg-white">
          <Outlet />
        </div>
      </main>
    </main>
  );
}
export default Admin;
