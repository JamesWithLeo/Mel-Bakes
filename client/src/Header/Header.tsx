import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCode,
  faUser,
  faBars,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store";

function HeaderComponent() {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const auth = useSelector((state: AppState) => state.auth);
  const openCart = () => {
    setIsMenuVisible(false);
    document.body.style.overflowY = "hidden";
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex w-full justify-center bg-secondarylight drop-shadow-lg">
        <header className="flex h-16 max-h-max w-full max-w-7xl items-center justify-between px-4">
          <h1 className="font-[Lobster] text-3xl text-primary">Mel Bakes</h1>

          {auth.User ? (
            <div className="hidden gap-8 md:flex">
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
            className="flex w-max items-center justify-center gap-2 sm:gap-4"
          >
            <a href="#footer" className="w-max">
              Contact us
            </a>
            <button
              onClick={() => {
                setIsMenuVisible(!isMenuVisible);
              }}
            >
              <FontAwesomeIcon
                icon={faBars}
                className="text-xl text-primary md:hidden"
              />
            </button>
          </div>
        </header>
      </div>
      {isMenuVisible ? (
        <>
          {auth.User ? (
            <div className="fixed grid h-full w-full grid-cols-1 items-center justify-evenly gap-8 bg-secondarylight pb-16 text-left text-4xl md:hidden">
              <Link
                to={"/"}
                onClick={() => {
                  setIsMenuVisible(false);
                }}
                className="flex h-full w-full items-center justify-center gap-4 text-left text-3xl text-primary hover:animate-pulse"
              >
                <FontAwesomeIcon icon={faHome} id="cart" className="" />
                Home
              </Link>

              <Link
                to={"/cart"}
                onClick={openCart}
                className="flex h-full w-full items-center justify-center gap-4 text-left text-3xl text-primary hover:animate-pulse"
              >
                <FontAwesomeIcon icon={faShoppingCart} id="cart" />
                Cart
              </Link>

              <Link
                className="flex h-full w-full items-center justify-center gap-4 text-left text-3xl text-primary hover:animate-pulse"
                to={"Account"}
              >
                <FontAwesomeIcon icon={faUser} />
                Account
              </Link>
              <>
                {auth.User.Type === "admin" ? (
                  <Link
                    to={"Admin"}
                    className="flex h-full w-full items-center justify-center gap-4 text-left text-3xl text-primary hover:animate-pulse"
                  >
                    <FontAwesomeIcon icon={faCode} id="Admin" />
                    <h1 className="px-3 py-1 text-primary">Admin</h1>
                  </Link>
                ) : null}
              </>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}
export default HeaderComponent;
