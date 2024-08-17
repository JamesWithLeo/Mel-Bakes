import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IOrder } from "../slice/orderSlice";
import axios from "axios";

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      const response = await axios.get("/melbake/order/delete/" + _id);
      console.log(response);
      return response;
    },
    onMutate: (_id: string) => {
      queryClient.setQueryData(["order"], (prevOrder: any) =>
        prevOrder?.filter((order: IOrder) => order._id !== _id),
      );
    },
  });
}
