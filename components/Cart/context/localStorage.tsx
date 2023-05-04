import { CartItem } from "./CartContext";

const CART_KEY = "XmCart";

export const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem(CART_KEY);
  if (cart) {
    return JSON.parse(cart);
  }
  return [];
};

export const setCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};
