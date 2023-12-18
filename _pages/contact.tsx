import SubmitMessage from "@/components/Contact/SubmitMessage";
import useNewsletterForm from "@/components/Contact/useNewsletterForm";
import EnvelopeIcon from "@/components/icons/EnvelopeIcon";
import TextInput from "@/components/inputs/TextInput";

const Contact = () => {
  const {
    register,
    submit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    isValid,
    hasFailed,
  } = useNewsletterForm();

  return (
    <div className="flex flex-col items-center mt-8">
      <section className="flex flex-col items-center gap-4 max-w-lg p-8 pb-4 rounded-lg bg-neutral-100 shadow-md">
        <EnvelopeIcon className="w-32 h-32" />
        <h1 className="text-4xl font-bold text-neutral-900">Subscribe</h1>
        <p className="text-l text-neutral-500">
          Subscribe to our newsletter to get the latest courses and deals.
        </p>
        {isSubmitSuccessful ? (
          <SubmitMessage hasFailed={hasFailed} />
        ) : (
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
        )}
      </section>
    </div>
  );
};

export default Contact;
