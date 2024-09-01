import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FlavorTypes, IProduct } from "../appTypes";
import axios from "axios";

export const useFilterFlavor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (filt: FlavorTypes) => {
      const response = await axios.get("melbake/cupcakes");
      return response.data;
    },
    onMutate(variables) {
      if (variables)
        queryClient.setQueryData(["product"], (prevProducts: IProduct[]) => {
          if (prevProducts) {
            return prevProducts.filter((value: IProduct) =>
              value.Flavor.split(" ").includes(variables),
            );
          }
        });
    },
    onSuccess(data, variables, context) {
      if (
        (queryClient.getQueryData(["product"]) as IProduct[]).length === 0 ||
        !variables
      ) {
        queryClient.setQueryData(["product"], () => data);
      }
    },
  });
};

export const useSortFlavor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (filt: FlavorTypes) => {
      const response = await axios.get("melbake/cupcakes");
      return response.data;
    },
    onMutate(variables) {
      if (variables)
        queryClient.setQueryData(["product"], (prevProducts: IProduct[]) => {
          if (prevProducts) {
            let remainingProduct: IProduct[] = [];
            const sortedProduct = prevProducts.filter((value) => {
              if (value.Flavor.split(" ").includes(variables)) return value;
              remainingProduct.push(value);
            });
            sortedProduct.push(...remainingProduct);
            return sortedProduct;
          }
        });
    },
    onSuccess(data, variables, context) {
      if (!variables) queryClient.setQueryData(["product"], () => data);
    },
  });
};

export const useSortPrice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sort: "ascending" | "descending") => {
      return sort;
    },
    onMutate(variables) {
      queryClient.setQueryData(["product"], (prevProducts: IProduct[]) => {
        if (prevProducts) {
          const products = prevProducts;
          let productsLength = products.length;
          for (let i = 0; i < productsLength - 1; i++) {
            for (let j = 0; j < productsLength - i - 1; j++) {
              if (variables === "descending") {
                if (products[j].Price < products[j + 1].Price) {
                  // Swap the elements
                  let temp = products[j];
                  products[j] = products[j + 1];
                  products[j + 1] = temp;
                }
              } else {
                if (products[j].Price > products[j + 1].Price) {
                  // Swap the elements
                  let temp = products[j];
                  products[j] = products[j + 1];
                  products[j + 1] = temp;
                }
              }
            }
          }
          return products;
        }
      });
    },
  });
};

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
        (prevProduct: IProduct[]) =>
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

export function useSearchProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: string) => {
      return variables;
    },
    onMutate: (variables) => {
      console.log(queryClient.getQueryData(["product"]));
    },
  });
}
