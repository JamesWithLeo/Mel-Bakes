import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../appTypes";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return axios.delete("/melbake/cart/" + id);
    },

    onMutate: (variables) => {
      queryClient.setQueryData(["cart"], (prevCarts: IProduct[]) => {
        console.log(prevCarts);
        return prevCarts.filter((item: IProduct) => item._id !== variables);
      });
    },
  });
};

/// unfinish
export const useMultiDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => {
      // join the id into one key, for cleaner and concise Url
      return axios.delete("/melbake/carts/", {
        params: { ids: ids.join(",") },
      });
    },

    onMutate: (variables) => {
      // this filters the items in the cart and apply changes.
      //  only return item, if the item is not in the variables of deleted ids .
      queryClient.setQueryData(["cart"], (prevCarts: IProduct[]) => {
        return prevCarts.filter(
          (item: IProduct) => !variables.includes(item._id),
        );
      });
    },
  });
};
