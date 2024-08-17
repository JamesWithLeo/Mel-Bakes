import * as React from "react";
import { useState } from "react";
import { IProduct } from "../slice/orderSlice";
import ProductTable from "./productTable";
import { useLayoutEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingComponents from "../loading/LoadingComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "../Pages/loadingPage";
import { Navigate } from "react-router-dom";
import { useCreateProduct, useUpdateProduct } from "../services/productService";
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

  const HandleUpdateProduct = async (product: IProduct) => {
    if (!isUpdatingProduct) updateProduct(product);
  };
  const HandleCreateProduct = async (product: IProduct) => {
    if (!isCreatingProduct) createProduct(product);
  };
  if (query.isLoading)
    return (
      <LoadingPage>
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-3xl text-primary"
        />
      </LoadingPage>
    );
  if (query.isError) return <Navigate to={"/"} replace />;
  return (
    <div className="flex w-full flex-col bg-white">
      {query.data ? (
        <ProductTable
          data={query.data}
          addRow={HandleCreateProduct}
          updateRow={HandleUpdateProduct}
        />
      ) : null}
    </div>
  );
}
export default ProductDashboard;
