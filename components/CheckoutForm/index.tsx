import TextInput from "@/components/inputs/TextInput";
import useCheckoutForm from "./useCheckoutForm";
import clsx from "clsx";

const CheckoutForm = () => {
  const { register, errors, submit, disabled } = useCheckoutForm();

  return (
    <form className="basis-1/2 max-w-md flex flex-col" onSubmit={submit}>
      <section className="flex flex-col gap-2 border-b border-neutral-200 mb-4">
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
      <section className="flex flex-col gap-4 border-b border-neutral-200 mb-4">
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
      <button
        className={clsx("btn btn-primary", disabled && "btn-disabled")}
        type="submit"
      >
        Confirm order
      </button>
    </form>
  );
};

export default CheckoutForm;
