import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
export default function Faqs() {
  return (
    <div>
      <div className="sticky top-0 z-0 flex w-full justify-center bg-secondarylight drop-shadow-lg">
        <header className="flex h-16 max-h-max w-full max-w-7xl items-center justify-between px-4">
          <div className="flex items-baseline gap-4">
            <Link className="font-[Lobster] text-3xl text-[#424874]" to={"/"}>
              Mel Bakes
            </Link>
            <FontAwesomeIcon icon={faAngleRight} className="text-[#424874]" />
            <h1 className="font-[Lobster] text-2xl text-[#424874]">Faqs</h1>
          </div>
        </header>
      </div>
      <h1>Order Process</h1>
      <h1>Payment Methods</h1>
      <h1>Returns and Refund</h1>
      <h1>Allergy Information</h1>
      <h1>Privacy Policy</h1>
    </div>
  );
}
