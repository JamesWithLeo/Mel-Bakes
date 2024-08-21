import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./ProductCard";
import axios from "axios";
import { IProduct } from "../AppDataTypes";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

function Product() {
  const productQuery = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await axios.get("melbake/cupcakes");
      return await response.data;
    },
  });

  if (productQuery.error) return <Navigate to={"/"} />;
  return (
    <>
      {productQuery.fetchStatus !== "fetching" ? (
        <>
          <div
            id="productContainer"
            className="row-span-2 flex min-h-96 flex-row flex-wrap justify-center gap-4 sm:gap-5 md:gap-6"
          >
            {productQuery.data.length
              ? productQuery.data.map((product: IProduct) => {
                  return <ProductCard key={product._id} productObj={product} />;
                })
              : ""}
          </div>
        </>
      ) : (
        <div
          id="productContainer"
          className="row-span-2 flex h-96 flex-col flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6"
        >
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="ml-2 animate-spin text-3xl text-secondarylight"
          />
          <h1 className="text-middle font-[Redhat] text-secondarylight">
            Looking for baked cupcakes
          </h1>
        </div>
      )}
    </>
  );
}
export default Product;
