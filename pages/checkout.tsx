import CartList from "@/components/Cart/CartList";
import useGetCartItems from "@/components/Cart/useGetCartItems";
import { useForm } from "react-hook-form";
import { object, string, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/inputs/TextInput";
import emailSchema from "@/components/ReviewsContainer/emailSchema";

const schema = object().shape({
  emailAddress: emailSchema,
  name: string().required().max(128),
  address: string().required().max(256),
  phone: string().required().max(32),
  cardNumber: string().required().max(32),
  cardName: string().required().max(128),
  cardExpiry: string().required().max(5).min(5),
  cardCvc: string().required().max(3),
});

type FormData = InferType<typeof schema>;

const CheckoutPage = () => {
  const { items, loading, error } = useGetCartItems();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit((data) => {
    console.log(data);
  });

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading || !items) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex gap-16 justify-between">
      <form className="basis-1/2 max-w-md" onSubmit={submit}>
        <section className="flex flex-col gap-2 border-b border-neutral-200 pb-8">
          <h1 className="text-xl text-neutral-900">Contact</h1>
          <TextInput
            label={"Email Address"}
            error={errors.emailAddress}
            {...register("emailAddress")}
          />
          <TextInput label={"Name"} error={errors.name} {...register("name")} />
          <TextInput
            label={"Address"}
            error={errors.address}
            {...register("address")}
          />
          <TextInput
            label={"Phone"}
            error={errors.phone}
            {...register("phone")}
          />
        </section>
        <section className="flex flex-col gap-4 border-b border-neutral-200 pb-8">
          <h1 className="text-xl text-neutral-900">Payment</h1>
          <TextInput
            label={"Card Number"}
            error={errors.cardNumber}
            {...register("cardNumber")}
          />
          <TextInput
            label={"Card Name"}
            error={errors.cardName}
            {...register("cardName")}
          />
          <TextInput
            label={"Card Expiry"}
            error={errors.cardExpiry}
            {...register("cardExpiry")}
          />
          <TextInput
            label={"Card CVC"}
            error={errors.cardCvc}
            {...register("cardCvc")}
          />
        </section>
      </form>
      <div className="basis-1/2 flex flex-col">
        <h1 className="text-xl text-neutral-900">Order Summary</h1>
        <CartList items={items} />
        <button className="btn btn-primary" onClick={submit}>
          Confirm order
        </button>
      </div>
    </main>
  );
};

export default CheckoutPage;
