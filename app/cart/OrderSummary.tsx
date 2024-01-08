import Link from "next/link";
import clsx from "clsx";
import useCartState from "@/components/Cart/context/useCartState";

const OrderSummary = ({ totalPrice }: OrderSummaryProps) => {
  const { items } = useCartState();
  const isCheckoutDisabled = items.length === 0;

  return (
    <div className="shrink-0 p-8 gap-8 flex flex-col border rounded-lg border-neutral-300 sticky top-4">
      <h2 className="text-xl text-neutral-900">Order summary</h2>
      <div className="flex gap-2">
        <p className="text-sm text-neutral-700">Total price</p>
        <p className="text-sm text-neutral-900 font-semibold">
          {totalPrice / 100} zł
        </p>
      </div>
      <Link
        className={clsx(
          "btn border-neutral-300",
          isCheckoutDisabled ? "btn-disabled" : ""
        )}
        href={isCheckoutDisabled ? {} : "/checkout"}
      >
        Checkout
      </Link>
    </div>
  );
};

type OrderSummaryProps = {
  totalPrice: number;
};

export default OrderSummary;
