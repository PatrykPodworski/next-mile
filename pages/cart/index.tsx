import CartList from "@/components/Cart/CartList";
import OrderSummary from "@/components/Cart/OrderSummary";
import useGetCartItems from "@/components/Cart/useGetCartItems";

const CartPage = () => {
  const { items, loading, error, totalPrice } = useGetCartItems();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading || !items) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="text-base my-8 text-neutral-900">Shopping cart</h1>
      <div className="flex gap-16 items-start">
        <div>
          <CartList items={items} />
        </div>
        <OrderSummary totalPrice={totalPrice} />
      </div>
    </>
  );
};

export default CartPage;
