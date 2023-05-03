import { useCartState } from "./CartContext";

const CartPage = () => {
  const cartState = useCartState();

  return (
    <div>
      <h1>Cart Page</h1>
      <pre>{JSON.stringify(cartState, null, 2)}</pre>
    </div>
  );
};

export default CartPage;
