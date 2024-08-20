import { Link, NavLink, Outlet } from "react-router-dom";

export default function OrderLayout() {
  return (
    <main className="flex h-dvh flex-col items-center gap-4">
      <section className="flex w-full flex-col items-center bg-secondarylight shadow drop-shadow">
        <header className="flex h-16 max-h-max w-full max-w-7xl items-center justify-between px-4">
          <Link
            className="font-[Lobster] text-3xl text-primary"
            to={"/"}
            replace
          >
            Mel Bakes
          </Link>
        </header>
      </section>

      <span className="flex items-center gap-2 rounded-2xl bg-gray-100 px-2 py-1 font-redhat text-sm text-primary shadow-inner">
        <NavLink
          to={"cart"}
          className={({ isActive }) =>
            [isActive ? "p rounded-2xl bg-white px-3 shadow" : "px-3"].join()
          }
        >
          cart
        </NavLink>
        <NavLink
          to={"order"}
          className={({ isActive }) =>
            [isActive ? "p rounded-2xl bg-white px-3 shadow" : "px-3"].join()
          }
        >
          orders
        </NavLink>
        <NavLink
          to={"recieved"}
          className={({ isActive }) =>
            [isActive ? "p rounded-2xl bg-white px-3 shadow" : "px-3"].join()
          }
        >
          recieved
        </NavLink>
      </span>

      <section className="w-full flex-1">
        <Outlet />
      </section>
    </main>
  );
}
