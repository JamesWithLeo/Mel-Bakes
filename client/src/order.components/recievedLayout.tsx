import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import LoadingComponents from "../components/LoadingComponent";

export default function RecievedLayout() {
  const user = useSelector((state: AppState) => state.auth.User);
  const query = useQuery({
    queryKey: ["received"],
    queryFn: async () => {
      const response = await axios.get("/melbake/received/" + user?._id);
      console.log(response);
      return await response.data;
    },
  });
  if (query.isError) return <Navigate to={"/"} replace />;
  return (
    <main className="h-full w-full">
      {query.isLoading ? <LoadingComponents /> : null}

      {query.data && query.data.lenght ? null : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <h1 className="text-gray-300">No cupcakes yet?</h1>
          <Link
            to={"/"}
            replace
            className="flex items-center gap-1 rounded px-3 py-1 font-raleway text-primary shadow active:shadow-primary"
          >
            Start ordering
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </Link>
        </div>
      )}
    </main>
  );
}
