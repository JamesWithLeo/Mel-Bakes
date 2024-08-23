import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IOrder } from "../appTypes";

export function useShipping() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      oid,
      IsShipping,
    }: {
      oid: string;
      IsShipping: boolean;
    }) => {
      const document = IsShipping
        ? { IsShipping: true }
        : { IsShipping: false };
      const response = await axios.put("/melbake/order/", document, {
        params: { oid: oid },
      });
      return response.data;
    },

    onMutate: (variables) => {
      queryClient.setQueryData(["delivery"], (prevDelivery: IOrder[]) => {
        return prevDelivery.filter(
          (value: IOrder) => value && value._id !== variables.oid,
        );
      });
    },
  });
}
