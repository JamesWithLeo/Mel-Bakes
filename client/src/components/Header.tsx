import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCode,
  faUser,
  faBars,
  faHome,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store";

function HeaderComponent() {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const auth = useSelector((state: AppState) => state.auth);
  const closeMenu = () => {
    setIsMenuVisible(false);
    document.body.style.overflowY = "true";
  };
  const closeMenuGotoCart = () => {
    setIsMenuVisible(false);
    document.body.style.overflowY = "false";
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
                to={"/minicart"}
                onClick={closeMenuGotoCart}
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
                to={"account/info"}
                replace={false}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-primary sm:text-base lg:text-base"
                />
                <h1 className="px-3 py-1 text-primary">account</h1>
              </Link>
            </div>
          ) : null}
          <div
            id="headerButton"
            className="flex w-max items-center justify-center gap-2 sm:gap-4"
          >
            {" "}
            <a href="#footer" className="hidden w-max lg:flex">
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
          <div className="fixed z-10 flex h-full w-full grid-cols-1 flex-col items-center justify-evenly gap-8 bg-secondarylight pb-16 text-left text-xl sm:text-2xl md:hidden">
            <Link
              to={"/"}
              onClick={() => {
                setIsMenuVisible(false);
              }}
              className="flex h-full w-full items-center justify-center gap-4 text-left text-primary hover:animate-pulse"
            >
              <FontAwesomeIcon icon={faHome} id="cart" className="" />
              Home
            </Link>

            {auth.User ? (
              <>
                <Link
                  to={"/minicart"}
                  onClick={closeMenuGotoCart}
                  className="flex h-full w-full items-center justify-center gap-4 text-left text-primary hover:animate-pulse"
                >
                  <FontAwesomeIcon icon={faShoppingCart} id="cart" />
                  Cart
                </Link>

                <Link
                  className="flex h-full w-full items-center justify-center gap-4 text-left text-primary hover:animate-pulse"
                  to={"account"}
                >
                  <FontAwesomeIcon icon={faUser} />
                  Account
                </Link>
              </>
            ) : null}

            <a
              className="flex h-full items-center justify-center gap-4 text-left text-primary hover:animate-pulse"
              href="#footer"
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faPhone} />
              Contact us
            </a>

            <>
              {auth.User && auth.User.Type === "admin" ? (
                <Link
                  to={"Admin"}
                  className="flex h-full items-center justify-center gap-4 text-left text-primary hover:animate-pulse"
                >
                  <FontAwesomeIcon icon={faCode} id="Admin" />
                  <h1 className="px-3 py-1 text-primary">Admin</h1>
                </Link>
              ) : null}
            </>
          </div>
        </>
      ) : null}
    </>
  );
}
export default HeaderComponent;
