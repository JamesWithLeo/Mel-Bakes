import { useSelector } from "react-redux";
import { AppState } from "../store";
import { Navigate, Outlet, Link } from "react-router-dom";

export default function AccountLayout() {
  const auth = useSelector((state: AppState) => state.auth);
  if (!auth.User) {
    return <Navigate to={"/"} replace />;
  }
  document.getElementById("logNavs")?.scrollIntoView({ behavior: "smooth" });
  return (
    <main className="flex h-dvh w-full flex-col items-center overflow-y-scroll">
      <section className="flex w-full flex-col items-center bg-secondarylight shadow drop-shadow">
        <header className="flex h-16 max-h-max w-full max-w-7xl items-center gap-2 px-4">
          <Link
            className="font-[Lobster] text-3xl text-primary"
            to={"/"}
            replace
          >
            Mel Bakes
          </Link>
        </header>
      </section>

      <section className="flex h-full w-full flex-col items-center">
        <section id="logPanel" className="w-full max-w-7xl">
          <Outlet />
        </section>
      </section>
    </main>
  );
}
