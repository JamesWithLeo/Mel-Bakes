import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCode,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { AuthConsumer } from "../authProvider";

function HeaderComponent() {
  const Auth = AuthConsumer();

  const openCart = () => {
    document.body.style.overflowY = "hidden";
  };
  return (
    <div className="sticky top-0 z-0 flex w-full justify-center bg-secondarylight drop-shadow-lg">
      <header className="flex h-16 max-h-max w-full max-w-7xl items-center justify-between px-4">
        <h1 className="font-[Lobster] text-3xl text-[#424874]">Mel Bakes</h1>

        {Auth.user ? (
          <div className="flex gap-8">
            <Link
              to={"Admin"}
              className="flex items-center justify-center gap-1"
            >
              <FontAwesomeIcon
                icon={faCode}
                id="Admin"
                className="text-primary sm:text-base lg:text-xl"
              />
              <h1 className="px-3 py-1 text-primary">Admin</h1>
            </Link>

            <Link
              to={"melbake/mycart"}
              className="flex items-center justify-center gap-1"
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                id="cart"
                onClick={openCart}
                className="text-primary sm:text-base lg:text-xl"
              />
              <h1 className="px-3 py-1 text-primary">Cart</h1>
            </Link>

            <Link
              className="flex items-center justify-center gap-1"
              to={"Account"}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="text-primary sm:text-base lg:text-xl"
              />
              <h1 className="px-3 py-1 text-primary">Account</h1>
            </Link>
          </div>
        ) : null}
        <div
          id="headerButton"
          className="flex items-center justify-center gap-2 sm:gap-4"
        >
          <button
            className="flex items-center justify-center gap-2 px-3 py-1 text-primary"
            id="contactUsButton"
            onClick={() => {}}
          >
            <a href="#footer">Contact us</a>
          </button>
        </div>
      </header>
    </div>
  );
}
export default HeaderComponent;
