import TextInput from "@/components/inputs/TextInput";
import useCheckoutForm from "./useCheckoutForm";
import clsx from "clsx";

const CheckoutForm = () => {
  const { register, errors, submit, disabled } = useCheckoutForm();

  return (
    <form
      className="basis-1/2 max-w-xs flex flex-col shrink-0"
      onSubmit={submit}
    >
      <section className="flex flex-col gap-2 mb-4">
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
      <button
        className={clsx("btn border-neutral-300", disabled && "btn-disabled")}
        type="submit"
        data-testid="checkout-submit"
      >
        Confirm order
      </button>
    </form>
  );
};

export default CheckoutForm;
