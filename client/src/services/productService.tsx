import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct } from "../AppDataTypes";
import axios from "axios";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (document: IProduct) => {
      document.Stock = Number(document.Stock);
      document.Price = Number(document.Price);
      const response = await axios.post("/melbake/product/", document);
      console.log(response);
      if (response.data.insertedId) {
        const newId = response.data.insertedId;
        return { response, newId };
      }
    },
    onSettled: (data, error, variables, context) => {
      queryClient.setQueryData(
        ["product"],
        (prevProduct: any) =>
          [
            ...prevProduct,
            {
              ...variables,
              _id: data?.newId,
            },
          ] as IProduct[],
      );
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (document: IProduct) => {
      document.Stock = Number(document.Stock);
      document.Price = Number(document.Price);
      const id = document._id;
      const response = await axios.put("/melbake/product/" + id, document);
      console.log(response);
      return response;
    },

    onMutate: (updatedProduct: IProduct) => {
      queryClient.setQueryData(["product"], (prevProducts: any) =>
        prevProducts?.map((prevProduct: IProduct) =>
          prevProduct._id === updatedProduct._id ? updatedProduct : prevProduct,
        ),
      );
    },
  });
}
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      const response = await axios.delete("/melbake/product/" + _id);
      console.log(response);
      return response;
    },
    onMutate: (_id: string) => {
      queryClient.setQueryData(["product"], (prevProducts: IProduct[]) =>
        prevProducts?.filter((product: IProduct) => product._id !== _id),
      );
    },
  });
}
