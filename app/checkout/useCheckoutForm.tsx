import { useForm } from "react-hook-form";
import { object, string, InferType } from "yup";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import emailSchema from "@/utils/emailSchema";
import useGetCartItems from "@/components/Cart/useGetCartItems";
import useCartState from "@/components/Cart/context/useCartState";

const schema = object().shape({
  emailAddress: emailSchema,
  name: string().required().max(128),
  address: string().required().max(256),
  phone: string().required().max(32),
});

type FormData = InferType<typeof schema>;

const useCheckoutForm = () => {
  const { data } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: data?.user && {
      name: data.user.name,
      emailAddress: data.user.email,
    },
  });

  const { items, loading, error } = useGetCartItems();
  const { emptyCart } = useCartState();
  const disabled = !items || loading || error;

  const submit = handleSubmit(async (data) => {
    if (disabled) {
      return;
    }

    const response = await postCheckout(data, items);

    emptyCart();
    window.location.href = response.url;
  });

  return { register, errors, submit, disabled };
};

const postCheckout = async (
  data: FormData,
  items: { id: string; quantity: number }[]
) => {
  const body = {
    ...data,
    items: items.map((x) => ({
      id: x.id,
      quantity: x.quantity,
    })),
  };

  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const responseData: CheckoutResponse = await response.json();
  return responseData;
};

type CheckoutResponse = {
  url: string;
};

export default useCheckoutForm;
