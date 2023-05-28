import CartList from "@/components/Cart/CartList";
import useGetCartItems from "@/components/Cart/useGetCartItems";
import CheckoutForm from "@/components/CheckoutForm";

const CheckoutPage = () => {
  const { items, loading, error } = useGetCartItems();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading || !items) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex gap-16 justify-between">
      <CheckoutForm />
      <div className="basis-1/2 flex flex-col">
        <h1 className="text-xl text-neutral-900">Order Summary</h1>
        <CartList items={items} />
      </div>
    </main>
  );
};

export default CheckoutPage;
