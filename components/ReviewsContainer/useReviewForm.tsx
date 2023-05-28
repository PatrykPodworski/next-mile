import { CreateProductReviewDocument } from "@/graphql/generated/graphql";
import { useMutation } from "@apollo/client";
import { object, string, number, InferType } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import emailSchema from "./emailSchema";
import { useEffect, useState } from "react";

const schema = object().shape({
  name: string().max(128).required(),
  email: emailSchema,
  headline: string().max(128).required(),
  content: string().max(256).required(),
  rating: number().min(1).max(5).required(),
});

type FormData = InferType<typeof schema>;

const useReviewForm = (slug: string) => {
  const [createProductReview, { loading }] = useMutation(
    CreateProductReviewDocument
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      rating: 5,
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const submit = handleSubmit(async (data) => {
    await createProductReview({
      variables: {
        review: {
          ...data,
          product: {
            connect: {
              slug: slug,
            },
          },
        },
      },
    });
  });

  return {
    register,
    submit,
    errors,
    loading,
  };
};

export default useReviewForm;
