import { ReactNode, useState } from "react";
import CartContext, { CartItem } from "./CartContext";

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((state) => {
      const itemExists = state.find((x) => x.id === item.id);
      if (itemExists) {
        return state.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }

      return [...state, item];
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

type CartContextProviderProps = {
  children: ReactNode;
};

export default CartContextProvider;
