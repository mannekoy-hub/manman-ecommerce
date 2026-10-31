import { useEffect, useState } from "react";
import axios from "axios";
import { Productcard } from "./ProductCard";

interface ApiProduct {
  id: number;
  name: string;
  price: number | string;
  image_type: string | null;
}

export function Productlist() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await axios.get<ApiProduct[]>("http://localhost:5010/products");
        setProducts(response.data);
      } catch {
        setError("Could not load products");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (error) return <p className="p-8 text-center text-red-600">{error}</p>;

  return (
    <div className="Product-List mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Productcard
          key={product.id}
          product={{
            name: product.name,
            price: Number(product.price),
            image: product.image_type
              ? `http://localhost:5010/products/${product.id}/image`
              : undefined,
          }}
        />
      ))}
    </div>
  );
}