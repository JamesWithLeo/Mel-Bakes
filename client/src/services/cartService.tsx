import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../slice/orderSlice";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return axios.get("/melbake/cart/delete/" + id);
    },

    onMutate: (variables) => {
      queryClient.setQueryData(["cart"], (prevCarts: any) => {
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
      return axios.post("/melbake/cart/delete/", ids);
    },

    onMutate: (variables) => {
      queryClient.setQueryData(["cart"], (prevCarts: any) => {
        console.log(prevCarts);

        // return prevCarts.filter((item: IProduct) => item._id !== variables);
      });
    },
  });
};
