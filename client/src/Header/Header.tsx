import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCode,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store";

function HeaderComponent() {
  const auth = useSelector((state: AppState) => state.auth);
  const openCart = () => {
    document.body.style.overflowY = "hidden";
  };

  return (
    <div className="sticky top-0 z-10 flex w-full justify-center bg-secondarylight drop-shadow-lg">
      <header className="flex h-16 max-h-max w-full max-w-7xl items-center justify-between px-4">
        <h1 className="font-[Lobster] text-3xl text-[#424874]">Mel Bakes</h1>

        {auth.User ? (
          <div className="flex gap-8">
            <>
              {auth.User.Type === "admin" ? (
                <Link
                  to={"Admin"}
                  className="flex items-center justify-center gap-1"
                >
                  <FontAwesomeIcon
                    icon={faCode}
                    id="Admin"
                    className="lg:base text-primary sm:text-base"
                  />
                  <h1 className="px-3 py-1 text-primary">Admin</h1>
                </Link>
              ) : null}
            </>

            <Link
              to={"/cart"}
              onClick={openCart}
              className="flex items-center justify-center gap-1"
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                id="cart"
                className="lg:base text-primary sm:text-base"
              />
              <h1 className="px-3 py-1 text-primary">Cart</h1>
            </Link>

            <Link
              className="flex items-center justify-center gap-1"
              to={"Account"}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="text-primary sm:text-base lg:text-base"
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
