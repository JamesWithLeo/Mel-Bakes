import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faLink } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import LogutButton from "./LogoutButton";

function FooterComponent({
  withLogoutButton = true,
}: {
  withLogoutButton?: boolean;
}) {
  const Auth = useSelector((state: AppState) => state.auth);
  const about: string =
    "Your one-stop destination for delectable, handcrafted cupcakes that are as beautiful as they are delicious. At Mel Bakes, we believe in the magic of baking and the joy it brings to every celebration. Our cupcakes are made with the finest ingredients, from rich, creamy butter to fresh, seasonal fruits, ensuring every bite is a burst of flavor. Whether you're looking for classic vanilla, decadent chocolate, or unique seasonal creations, our cupcakes are perfect for any occasion. Join us at Mel Bakes, where every cupcake is a sweet masterpiece baked with love and passion.";

  return (
    <div
      id="footerWrapper"
      className="flex h-auto w-full justify-center bg-darker"
    >
      <footer
        className="h-auto w-full max-w-7xl bg-darker px-4 py-4 sm:px-8"
        id="footer"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 md:gap-8 lg:gap-16">
          <div className="mb-8 flex w-full flex-col gap-2 font-[Redhat] sm:w-1/3 md:w-1/2">
            <h1 className="text-xl text-[goldenrod]">About us</h1>
            <p className="h-auto text-justify text-sm text-white">{about}</p>
          </div>

          <div className="mb-8 flex h-max w-auto flex-col gap-4 sm:flex-row sm:gap-8">
            <div className="md flex flex-col gap-2 font-[Redhat] text-sm text-white md:gap-3">
              <h1 className="text-xl text-[goldenrod]">Contact Us</h1>

              <a className="" href="/">
                MelBakes@gmail.com
              </a>
              <a className="" href="https://www.facebook.com/MelBakes">
                www.facebook.com/MelBakes
              </a>
              <h3 className="">(+63) 091223456789</h3>
            </div>
            <div className="flex flex-col gap-2 font-[Redhat] text-sm text-white md:gap-3">
              <h1 className="text-xl text-[goldenrod]">Customers service</h1>
              <Link className="hover:underline" to={"service"}>
                <FontAwesomeIcon icon={faLink} className="linkIcon mr-2" />
                Faq`s
              </Link>
              <Link to={"service"} className="hover:underline">
                <FontAwesomeIcon icon={faLink} className="linkIcon mr-2" />
                Allergy Information
              </Link>
              <Link to={"service"} className="hover:underline">
                <FontAwesomeIcon icon={faLink} className="linkIcon mr-2" />
                Privacy Policy
              </Link>
              <Link to={"service"} className="hover:underline">
                <FontAwesomeIcon icon={faLink} className="linkIcon mr-2" />
                Returns and Refund
              </Link>
            </div>
          </div>
        </div>
        {Auth.User ? (
          <div className="flex flex-col items-end">
            {withLogoutButton ? <LogutButton /> : null}
          </div>
        ) : null}

        <h1
          className="text-center text-xs text-gray-950 text-opacity-50"
          id="author"
        >
          CODED BY JAMES LEO
          <FontAwesomeIcon
            className="ml-2 text-opacity-50"
            icon={faCode}
            id="endTag"
          />
        </h1>
      </footer>
    </div>
  );
}
export default FooterComponent;
