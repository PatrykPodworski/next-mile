import emailSchema from "@/utils/emailSchema";
import { InferType, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

const schema = object().shape({
  email: emailSchema,
});

type FormData = InferType<typeof schema>;

const useNewsletterForm = () => {
  const [hasFailed, setHasFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit(
    async (data) => {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setHasFailed(true);
      }
    },
    (errors) => console.log(errors)
  );

  return {
    submit,
    register,
    errors,
    isSubmitSuccessful,
    isSubmitting,
    isValid,
    hasFailed,
  };
};

export default useNewsletterForm;
