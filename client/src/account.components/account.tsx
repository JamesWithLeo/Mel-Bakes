import { useSelector } from "react-redux";
import { AppState } from "../store";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import plaidPattern from "../assets/images/pattern.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function Account() {
  const navigate = useNavigate();
  const auth = useSelector((state: AppState) => state.auth);
  if (!auth.User) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="h-dvh w-full">
      <Link
        to={"/"}
        replace
        className="absolute left-4 top-4 font-[Lobster] text-3xl text-primary"
      >
        Mel Bakes
      </Link>
      <section
        style={{ backgroundImage: `url(${plaidPattern})` }}
        className="mb-14 grid h-52 grid-cols-1 grid-rows-3 items-center"
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
            [isActive ? "bg-gray-50 px-4 py-1" : "px-4 py-1"].join()
          }
        >
          cart
        </NavLink>
        <NavLink
          to={"order"}
          className={({ isActive, isPending, isTransitioning }) =>
            [isActive ? "bg-gray-50 px-4 py-1" : "px-4 py-1"].join()
          }
        >
          orders
        </NavLink>
        <button className="px-4 py-1 sm:hidden">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
        <NavLink
          to={"recieved"}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isActive
                ? "hidden bg-gray-50 px-4 py-1 sm:block"
                : "hidden px-4 py-1 sm:block",
            ].join()
          }
        >
          recieved
        </NavLink>
        <NavLink
          to={"favorites"}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isActive
                ? "hidden bg-gray-50 px-4 py-1 sm:block"
                : "hidden px-4 py-1 sm:block",
            ].join()
          }
        >
          favorites
        </NavLink>
        <NavLink
          to={"cancelled"}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isActive
                ? "hidden bg-gray-50 px-4 py-1 sm:block"
                : "hidden px-4 py-1 sm:block",
            ].join()
          }
        >
          cancelled
        </NavLink>
      </section>
      <section id="logPanel" className="h-full w-full bg-gray-50">
        <Outlet />
      </section>
    </div>
  );
}
