"use client";

import SubmitMessage from "./SubmitMessage";
import useNewsletterForm from "./useNewsletterForm";
import TextInput from "@/components/inputs/TextInput";

const NewsletterForm = () => {
  const {
    register,
    submit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    isValid,
    hasFailed,
  } = useNewsletterForm();

  if (isSubmitSuccessful) {
    return <SubmitMessage hasFailed={hasFailed} />;
  }

  return (
    <form className="flex mt-4 w-full" onSubmit={submit}>
      <TextInput
        placeholder="Your email address"
        error={errors.emailAddress}
        {...register("emailAddress")}
        className="w-full mr-4"
        disabled={isSubmitting}
      />
      <button
        data-testid="newsletter-submit"
        className="btn btn-primary btn-sm"
        disabled={!isValid || isSubmitting}
      >
        Submit
      </button>
    </form>
  );
};

export default NewsletterForm;
