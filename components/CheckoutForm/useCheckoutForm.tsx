import { useForm } from "react-hook-form";
import { object, string, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import emailSchema from "@/utils/emailSchema";
import { useMutation } from "@apollo/client";
import { CreateOrderDocument } from "@/graphql/generated/graphql";
import useGetCartItems from "@/components/Cart/useGetCartItems";

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

const useCheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { items, totalPrice, loading, error } = useGetCartItems();
  const [createOrder, { loading: loadingMutation }] =
    useMutation(CreateOrderDocument);

  const disabled = !items || loading || error || loadingMutation;

  const submit = handleSubmit((data) => {
    if (disabled) {
      return;
    }

    createOrder({
      variables: {
        data: {
          email: data.emailAddress,
          total: totalPrice,
          stripeCheckoutId: "stripeCheckoutId",
          orderItems: {
            create: items.map((x) => ({
              product: {
                connect: {
                  slug: x.slug,
                },
              },
              quantity: x.quantity,
              total: x.quantity * x.price,
            })),
          },
        },
      },
    });
  });

  return { register, errors, submit, disabled };
};

export default useCheckoutForm;
