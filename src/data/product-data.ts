import mensShirtImage from "../assets/mens-swweater.jpg";
import nutellaImage from "../assets/nutella.jpg";
import perfumeImage from "../assets/perfume.jpg";
import watchImage from "../assets/watch.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "mens-striped-shirt",
    name: "Men's Striped Button-Up Shirt",
    category: "Clothing",
    price: 899,
    description: "A light green striped long-sleeve shirt for everyday wear.",
    image: mensShirtImage,
  },
  {
    id: "nutella-hazelnut-spread",
    name: "Nutella Hazelnut Spread",
    category: "Food",
    price: 299,
    description: "Hazelnut spread with cocoa.",
    image: nutellaImage,
  },
  {
    id: "dior-sauvage-eau-forte",
    name: "Dior Sauvage Eau Forte",
    category: "Fragrance",
    price: 6999,
    description: "A men's fragrance in a dark blue glass bottle.",
    image: perfumeImage,
  },
  {
    id: "orient-automatic-watch",
    name: "Orient Automatic Watch",
    category: "Accessories",
    price: 12999,
    description: "An automatic watch with a blue dial and stainless-steel bracelet.",
    image: watchImage,
  },
];