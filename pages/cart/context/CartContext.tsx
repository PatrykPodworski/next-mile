import { createContext } from "react";

const CartContext = createContext<CartState | null>(null);

export type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default CartContext;
