import { useSelector } from "react-redux";
import { AppState } from "../store";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import plaidPattern from "../assets/images/pattern.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function Account() {
  const auth = useSelector((state: AppState) => state.auth);
  if (!auth.User) {
    return <Navigate to={"/"} replace />;
  }
  document.getElementById("logNavs")?.scrollIntoView({ behavior: "smooth" });
  return (
    <main className="flex h-dvh w-full flex-col items-center">
      <Link
        to={"/"}
        replace
        className="absolute left-4 top-4 z-10 font-[Lobster] text-3xl text-primary"
      >
        Mel Bakes
      </Link>
      <section
        style={{ backgroundImage: `url(${plaidPattern})` }}
        className="mb-14 grid h-52 w-full grid-cols-1 grid-rows-3 items-center drop-shadow-sm"
      >
        <div className="row-start-3 flex h-20 w-full justify-center">
          <div className="row-start-2 h-28 w-28 bg-gray-100">.</div>
        </div>
      </section>

      <section className="mb-16 flex w-full flex-col items-center justify-center">
        {auth.User ? (
          <>
            <h1>
              {auth.User.FirstName} {auth.User.LastName}
            </h1>
            <h1>{auth.User._id}</h1>
            <h1>{auth.User.Gmail}</h1>
          </>
        ) : null}
      </section>

      <section
        id="logNavs"
        className="flex w-full items-center justify-center align-middle"
      >
        <NavLink
          to={"cart"}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isActive
                ? "rounded-t bg-primarylight px-4 py-1 text-white"
                : "px-4 py-1 text-primary",
            ].join()
          }
        >
          cart
        </NavLink>
        <NavLink
          to={"order"}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isActive
                ? "rounded-t bg-primarylight px-4 py-1 text-white"
                : "px-4 py-1 text-primary",
            ].join()
          }
        >
          orders
        </NavLink>

        <NavLink
          to={"recieved"}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isActive
                ? "rounded-t bg-primarylight px-4 py-1 text-white"
                : "px-4 py-1 text-primary",
            ].join()
          }
        >
          recieved
        </NavLink>
      </section>

      <section className="flex w-full flex-col items-center border-t-2 border-primarylight">
        <section id="logPanel" className="w-full max-w-7xl">
          <Outlet />
        </section>
      </section>
    </main>
  );
}
