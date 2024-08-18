import * as React from "react";
import { IProduct } from "../slice/orderSlice";
import ProductTable from "./productTable";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../components/loadingPage";
import { Navigate } from "react-router-dom";
import {
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "../services/productService";
function ProductDashboard() {
  const query = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = axios.get("/melbake/cupcakes");
      return (await response).data;
    },
  });
  const { mutateAsync: updateProduct, isPending: isUpdatingProduct } =
    useUpdateProduct();
  const { mutateAsync: createProduct, isPending: isCreatingProduct } =
    useCreateProduct();
  const { mutateAsync: deleteProduct, isPending: isDeletingProduct } =
    useDeleteProduct();

  const HandleUpdateProduct = async (product: IProduct) => {
    if (!isUpdatingProduct) updateProduct(product);
  };
  const HandleCreateProduct = async (product: IProduct) => {
    if (!isCreatingProduct) createProduct(product);
  };
  const HandleDeleteProduct = async (_id: string) => {
    if (!isDeletingProduct) deleteProduct(_id);
  };
  if (query.isLoading) return <LoadingPage />;
  if (query.isError) return <Navigate to={"/"} replace />;
  return (
    <div className="flex w-full flex-col bg-white">
      {query.data ? (
        <ProductTable
          data={query.data}
          addRow={HandleCreateProduct}
          updateRow={HandleUpdateProduct}
          deleteRow={HandleDeleteProduct}
        />
      ) : null}
    </div>
  );
}
export default ProductDashboard;
