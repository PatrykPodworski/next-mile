import CartList from "@/components/Cart/CartList";
import OrderSummary from "@/components/Cart/OrderSummary";
import useGetCartItems from "@/components/Cart/useGetCartItems";
import TextInput from "../components/inputs/TextInput";

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
      <form className="basis-1/2 max-w-md">
        <section className="flex flex-col gap-4 border-b border-neutral-200 pb-8">
          <h1 className="text-xl text-neutral-900">Contact</h1>
          <TextInput label="Email address" name="emailAddress" type="email" />
        </section>
        <section className="flex flex-col gap-4 border-b border-neutral-200 pb-8">
          <h1 className="text-xl text-neutral-900">Shipping</h1>
          <TextInput label="Name" name="name" />
          <TextInput label="Company" name="company" />
          <TextInput label="Address" name="address" />
          <TextInput label="Phone" name="phone" />
        </section>
        <section className="flex flex-col gap-4 border-b border-neutral-200 pb-8">
          <h1 className="text-xl text-neutral-900">Payment</h1>
          <TextInput label="Card number" name="cardNumber" />
          <TextInput label="Name on card" name="nameOnCard" />
          <TextInput
            label="Expiration date"
            name="expirationDate"
            type="date"
          />
          <TextInput label="CVC" name="cvc" type="number" />
        </section>
      </form>
      <div className="basis-1/2 flex flex-col">
        <h1 className="text-xl text-neutral-900">Order Summary</h1>
        <CartList items={items} />
        <button className="btn btn-primary">Confirm order</button>
      </div>
    </main>
  );
};

export default CheckoutPage;
