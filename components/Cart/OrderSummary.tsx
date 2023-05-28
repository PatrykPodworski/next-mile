import Link from "next/link";

const OrderSummary = ({ totalPrice }: OrderSummaryProps) => (
  <div className="shrink-0 p-8 bg-neutral-100 gap-8 flex flex-col w-96">
    <h2 className="text-xl text-neutral-900">Order summary</h2>
    <div className="flex justify-between">
      <p className="text-sm text-neutral-700">Total price</p>
      <p className="text-sm text-neutral-900 font-semibold">{totalPrice} zł</p>
    </div>
    <Link className="btn btn-primary" href={"/checkout"}>
      Checkout
    </Link>
  </div>
);

type OrderSummaryProps = {
  totalPrice: number;
};

export default OrderSummary;