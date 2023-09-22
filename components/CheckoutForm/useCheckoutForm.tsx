import { useForm } from "react-hook-form";
import { object, string, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import emailSchema from "@/utils/emailSchema";
import useGetCartItems from "@/components/Cart/useGetCartItems";

const schema = object().shape({
  emailAddress: emailSchema,
  name: string().required().max(128),
  address: string().required().max(256),
  phone: string().required().max(32),
});

type FormData = InferType<typeof schema>;

const useCheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { items, loading, error } = useGetCartItems();
  const disabled = !items || loading || error;

  const submit = handleSubmit(async (data) => {
    if (disabled) {
      return;
    }

    const response = await postCheckout(data, items);
    window.location.href = response.url;
  });

  return { register, errors, submit, disabled };
};

const postCheckout = async (
  data: FormData,
  items: { slug: string; quantity: number }[]
) => {
  const body = {
    ...data,
    items: items.map((x) => ({
      slug: x.slug,
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
