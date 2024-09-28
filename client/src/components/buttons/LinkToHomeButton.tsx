import { Link } from "react-router-dom";

export default function LinkToHomeButton() {
  return (
    <Link
      className="md:text-l w-max rounded bg-secondarylight px-2 text-sm text-gray-500 outline-primary sm:text-base md:px-3 md:py-1"
      to={"/"}
    >
      Back
    </Link>
  );
}
