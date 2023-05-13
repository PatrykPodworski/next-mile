import CartList from "@/components/Cart/CartList";
import useGetCartItems from "./useGetCartItems";

const CartPage = () => {
  const { items, loading, error, itemsCount, totalPrice } = useGetCartItems();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading || !items) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold my-4 text-neutral-900">Your cart</h1>
      <p className="text-xl text-neutral-900 mb-8">
        Items in cart: {itemsCount}
      </p>
      <p className="text-xl text-neutral-900 mb-8">
        Total price: {totalPrice} zł
      </p>

      <CartList items={items} />
    </div>
  );
};

export default CartPage;
