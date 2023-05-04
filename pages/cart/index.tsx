import CartList from "@/components/Cart/CartList";
import useCartState from "@/components/Cart/context/useCartState";

const CartPage = () => {
  const { items } = useCartState();
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      <h1 className="text-4xl font-bold my-4 text-neutral-900">Your cart</h1>
      <p className="text-xl text-neutral-900 mb-8">
        Items in cart: {itemsCount}
      </p>
      <CartList items={items} />
    </div>
  );
};

export default CartPage;
