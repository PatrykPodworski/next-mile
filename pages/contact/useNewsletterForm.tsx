import emailSchema from "@/utils/emailSchema";
import { InferType, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = object().shape({
  emailAddress: emailSchema,
});

type FormData = InferType<typeof schema>;

const useNewsletterForm = () => {
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

  return {
    submit,
    register,
    errors,
  };
};

export default useNewsletterForm;
