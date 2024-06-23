import cupcakes from "../data";
import ProductCard from "./ProductCard";

function Product() {
  const cupcakesElement = cupcakes.map((cupcake) => {
    if (cupcake.isAvailable === true) {
      return <ProductCard productObj={cupcake} />;
    } else {
      return null;
    }
  });
  return <>{cupcakesElement}</>;
}
export default Product;
