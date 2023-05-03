import { useContext } from "react";
import CartContext from "./CartContext";

const useCartState = () => {
  const cartState = useContext(CartContext);
  if (!cartState) {
    throw new Error("useCartState must be used within a CartContextProvider");
  }

  return cartState;
};

export default useCartState;
