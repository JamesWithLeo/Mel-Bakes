import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IOrder } from "../appTypes";
import axios from "axios";

// for admin
export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (oid: string) => {
      console.log(oid);
      const response = await axios.delete("/melbake/order/", {
        params: { id: oid },
      });
      console.log(response);
      return response;
    },
    onMutate: (variables) => {
      queryClient.setQueryData(["order"], (prevOrder: any) =>
        prevOrder?.filter((order: IOrder) => order._id !== variables),
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
