import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCode } from "@fortawesome/free-solid-svg-icons";

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
        <div
          id="headerButton"
          className="flex items-center justify-center gap-2 sm:gap-4"
        >
          {Auth.user ? (
            <>
              <Link to={"Admin"}>
                <FontAwesomeIcon
                  icon={faCode}
                  id="Admin"
                  className="text-primary sm:text-base lg:text-xl"
                />
              </Link>

              <Link to={"melbake/mycart"}>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  id="cart"
                  onClick={openCart}
                  className="text-primary sm:text-base lg:text-xl"
                />
              </Link>
            </>
          ) : null}
          <button
            id="contactUsButton"
            className="border border-solid border-black px-3 py-1"
            onClick={() => {}}
          >
            <a href="#footer">Contact Us</a>
          </button>
        </div>
      </header>
    </div>
  );
}
export default HeaderComponent;
