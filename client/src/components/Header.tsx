import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCode,
  faUser,
  faBars,
  faHome,
  faPhone,
  faTruck,
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
    document.body.style.overflowY = "scroll";
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex w-full justify-center bg-secondarylight drop-shadow-lg">
        <header className="flex h-16 max-h-max w-full max-w-7xl items-center justify-between px-4">
          <h1 className="font-[Lobster] text-3xl text-primary">Mel Bakes</h1>

          {auth.User ? (
            <div className="hidden gap-8 md:flex">
              <Link
                to={"/minicart"}
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 px-3 py-1 text-primary"
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  id="cart"
                  className="lg:base text-primary sm:text-base"
                />
                Cart
              </Link>

              <Link
                className="flex items-center justify-center gap-2 px-3 py-1 text-primary"
                to={"account/info"}
                onClick={closeMenu}
                replace
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-primary sm:text-base lg:text-base"
                />
                Account
              </Link>
              <>
                {auth.User.role === "admin" ? (
                  <Link
                    to={"Admin"}
                    onClick={closeMenu}
                    replace
                    className="flex items-center justify-center gap-2 px-3 py-1 text-primary"
                  >
                    <FontAwesomeIcon
                      icon={faCode}
                      id="Admin"
                      className="lg:base text-primary sm:text-base"
                    />
                    Admin
                  </Link>
                ) : null}
              </>
              <>
                {auth.User.role === "courier" || auth.User.role === "admin" ? (
                  <Link
                    to={"deliver"}
                    onClick={closeMenu}
                    replace
                    className="flex items-center justify-center gap-2 px-3 py-1 text-primary"
                  >
                    <FontAwesomeIcon
                      icon={faTruck}
                      className="lg:base text-primary sm:text-base"
                    />
                    delivery
                  </Link>
                ) : null}
              </>
            </div>
          ) : null}
          <div
            id="headerButton"
            className="flex w-max items-center justify-center gap-2 sm:gap-4"
          >
            {" "}
            <a
              className="font-redhat hidden h-full items-center justify-center gap-4 text-left text-primary md:flex"
              href="#footer"
              onClick={closeMenu}
            >
              Contact us
            </a>
            <button
              onClick={() => {
                setIsMenuVisible(!isMenuVisible);
                if (isMenuVisible) document.body.style.overflowY = "scroll";
                else document.body.style.overflowY = "hidden";
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
              onClick={closeMenu}
              className="flex h-full w-full items-center justify-center gap-4 text-left text-primary hover:animate-pulse"
            >
              <FontAwesomeIcon icon={faHome} id="cart" className="" />
              Home
            </Link>

            {auth.User ? (
              <>
                <Link
                  to={"/minicart"}
                  onClick={closeMenu}
                  replace
                  className="flex h-full w-full items-center justify-center gap-4 text-left text-primary hover:animate-pulse"
                >
                  <FontAwesomeIcon icon={faShoppingCart} id="cart" />
                  Cart
                </Link>

                <Link
                  to={"account"}
                  onClick={closeMenu}
                  className="flex h-full w-full items-center justify-center gap-4 text-left text-primary hover:animate-pulse"
                >
                  <FontAwesomeIcon icon={faUser} />
                  Account
                </Link>
              </>
            ) : null}

            <>
              {auth.User && auth.User.role === "admin" ? (
                <Link
                  to={"Admin"}
                  onClick={closeMenu}
                  className="flex h-full items-center justify-center gap-4 px-3 py-1 text-left text-primary hover:animate-pulse"
                >
                  <FontAwesomeIcon icon={faCode} id="Admin" />
                  Admin
                </Link>
              ) : null}
            </>
            <>
              {auth.User &&
              (auth.User.role === "courier" || auth.User.role === "admin") ? (
                <Link
                  to={"deliver"}
                  onClick={closeMenu}
                  replace
                  className="flex h-full items-center justify-center gap-4 text-left text-primary hover:animate-pulse"
                >
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="lg:base text-primary sm:text-base"
                  />
                  delivery
                </Link>
              ) : null}
            </>
            <a
              className="font-redhat flex h-full items-center justify-center gap-4 text-left text-primary hover:animate-pulse"
              href="#footer"
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faPhone} />
              Contact us
            </a>
          </div>
        </>
      ) : null}
    </>
  );
}
export default HeaderComponent;
