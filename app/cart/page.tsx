"use client";

import CartList from "@/components/Cart/CartList";
import OrderSummary from "@/app/cart/OrderSummary";
import useGetCartItems from "@/components/Cart/useGetCartItems";
import { notFound } from "next/navigation";

const CartPage = () => {
  const { items, loading, error, totalPrice } = useGetCartItems();

  if (error) {
    notFound();
  }

  if (loading || !items) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex gap-16 items-start">
        <CartList items={items} />
        <OrderSummary totalPrice={totalPrice} />
      </div>
    </>
  );
};

export default CartPage;
