import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import OrderTable from "./orderTable";
import { useDeleteOrder, useUpdateOrder } from "../services/orderService";
import LoadingPage from "../components/loadingPage";
import { IOrder } from "../appTypes";

export default function OrderDashboard() {
  const query = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const response = await axios.get("/melbake/order");
      return await response.data;
    },
  });
  const { mutateAsync: updateOrder, isPending: isUpdatingOrder } =
    useUpdateOrder();
  const { mutateAsync: deleteOrder, isPending: isDeletingOrder } =
    useDeleteOrder();

  const HandleEditOrder = (order: IOrder) => {
    if (!isUpdatingOrder) updateOrder(order);
  };

  const HandleDeleteOrder = (oid: string) => {
    if (!isDeletingOrder) deleteOrder(oid);
  };
  if (query.isLoading) return <LoadingPage />;
  return (
    <main>
      <>
        {query.data ? (
          <OrderTable
            data={query.data}
            deleteRow={HandleDeleteOrder}
            updateRow={HandleEditOrder}
          />
        ) : null}
      </>
    </main>
  );
}
