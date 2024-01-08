"use client";

import { ReactNode, useEffect, useState } from "react";
import CartContext, { CartItem } from "./CartContext";
import { getCartFromLocalStorage, setCartToLocalStorage } from "./localStorage";

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [items, setItems] = useState<CartItem[]>();

  useEffect(() => {
    setItems(getCartFromLocalStorage());
  }, []);

  useEffect(() => {
    if (!items) {
      return;
    }

    setCartToLocalStorage(items);
  }, [items]);

  const addItem = (id: CartItem["id"]) => {
    setItems((state) => {
      if (!state) {
        return undefined;
      }

      const itemExists = state.find((x) => x.id === id);
      if (itemExists) {
        return state.map((x) =>
          x.id === id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }

      return [...state, { id, quantity: 1 }];
    });
  };

  const removeItem = (id: CartItem["id"]) => {
    setItems((state) => {
      if (!state) {
        return undefined;
      }

      const itemExists = state.find((x) => x.id === id);
      if (!itemExists) {
        return state;
      }

      if (itemExists.quantity === 1) {
        return state.filter((x) => x.id !== id);
      }

      return state.map((x) =>
        x.id === id ? { ...x, quantity: x.quantity - 1 } : x
      );
    });
  };

  const emptyCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items: items || [],
        addItem,
        removeItem,
        emptyCart,
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
