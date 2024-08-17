import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import OrderTable from "./orderTable";
import { useDeleteOrder } from "../services/orderService";

export default function OrderDashboard() {
  const query = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const response = await axios.get("/melbake/order");
      return await response.data;
    },
  });
  const { mutateAsync: deleteOrder, isPending: isDeletingOrder } =
    useDeleteOrder();

  const HandleDeleteOrder = (id: string) => {
    deleteOrder(id);
  };
  return (
    <main>
      <>
        {query.data ? (
          <OrderTable data={query.data} deleteRow={HandleDeleteOrder} />
        ) : null}
      </>
    </main>
  );
}
