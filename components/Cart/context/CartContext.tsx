import { createContext } from "react";

const CartContext = createContext<CartState | null>(null);

export type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: CartItem["id"]) => void;
};

export type CartItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
};

export default CartContext;
