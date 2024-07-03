import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { AccountContext } from "../Context";

function HeaderComponent({ setCartDisplayProp }) {
  const Account = useContext(AccountContext);

  const openCart = () => {
    setCartDisplayProp(true);
    document.body.style.overflowY = "hidden";
  };
  return (
    <header className="flex h-16 max-h-max w-full max-w-7xl items-center justify-between px-4">
      <h1 className="font-[Lobster] text-3xl text-[#424874]">Mel Bakes</h1>
      <div
        id="headerButton"
        className="flex items-center justify-center gap-2 sm:gap-4"
      >
        {Account.IsLogged ? (
          <FontAwesomeIcon
            icon={faShoppingCart}
            id="cart"
            onClick={openCart}
            className="text-primary sm:text-xl lg:text-2xl"
          />
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
  );
}
export default HeaderComponent;
