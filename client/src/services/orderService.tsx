import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IOrder } from "../AppDataTypes";
import axios from "axios";

// for admin
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

// for user
export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ _id, OrderId }: { _id: string; OrderId: string }) => {
      const response = await axios.delete("/melbake/order/" + _id, {
        params: { OrderId: OrderId },
      });
      return response;
    },
    onSuccess(data, variables, context) {
      console.log(variables);
      queryClient.setQueryData(["order"], (prevOrders: IOrder[]) => {
        console.log(prevOrders);
        return prevOrders.filter(
          (order: IOrder) => order._id !== variables.OrderId,
        );
      });
    },
  });
}
