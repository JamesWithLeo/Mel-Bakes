import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct } from "../slice/orderSlice";
import axios from "axios";
import { Update } from "@mui/icons-material";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (document: IProduct) => {
      const response = await axios.post("/melbake/product/insert", document);
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
      const id = document._id;
      const response = await axios.post(
        "/melbake/product/update/" + id,
        document,
      );
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
