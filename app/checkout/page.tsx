"use client";

import CartList from "@/components/Cart/CartList";
import useGetCartItems from "@/components/Cart/useGetCartItems";
import CheckoutForm from "@/app/checkout/CheckoutForm";
import { notFound } from "next/navigation";

const CheckoutPage = () => {
  const { items, loading, error } = useGetCartItems();

  if (error) {
    notFound();
  }

  if (loading || !items) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex gap-16 justify-between">
      <CheckoutForm />
      <div className="basis-1/2 flex flex-col">
        <h1 className="text-xl text-neutral-900">Order Summary</h1>
        <CartList items={items} />
      </div>
    </div>
  );
};

export default CheckoutPage;
