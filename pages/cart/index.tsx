import useCartState from "./context/useCartState";

const CartPage = () => {
  const { items } = useCartState();

  return (
    <div>
      <h1>Cart Page</h1>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
};

export default CartPage;
