import { ReactNode, createContext, useContext, useState } from "react";

const CartContext = createContext<CartState | null>(null);

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartState, setCartState] = useState<CartState>({
    items: [
      {
        id: 1,
        name: "Test",
        price: 1,
        quantity: 1,
      },
    ],
  });

  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartContext);
  if (!cartState) {
    throw new Error("useCartState must be used within a CartContextProvider");
  }

  return cartState;
};

type CartState = {
  items: CartItem[];
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartContextProviderProps = {
  children: ReactNode;
};

export { CartContext, CartContextProvider };
