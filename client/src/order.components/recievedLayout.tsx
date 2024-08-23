import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { Navigate } from "react-router-dom";

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
  return <main>{}</main>;
}
