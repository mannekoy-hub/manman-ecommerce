import { Productcard } from "./ProductCard";
import { products } from "../../data/product-data";



export function Productlist() {
  return (
    <div className="Product-List mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Productcard key={product.id} product={product} />
      ))}
    </div>
  );
}