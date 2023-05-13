import { createContext } from "react";

const CartContext = createContext<CartState | null>(null);

export type CartState = {
  items: CartItem[];
  addItem: (id: CartItem["id"]) => void;
  removeItem: (id: CartItem["id"]) => void;
};

export type CartItem = {
  id: string;
  quantity: number;
};

export default CartContext;
