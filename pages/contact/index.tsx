import EnvelopeIcon from "@/components/icons/EnvelopeIcon";
import TextInput from "@/components/inputs/TextInput";
import useNewsletterForm from "./useNewsletterForm";

const Contact = () => {
  const { register, submit, errors } = useNewsletterForm();
  return (
    <div className="flex flex-col items-center mt-8">
      <section className="flex flex-col items-center gap-4 max-w-lg p-8 pb-4 rounded-lg bg-neutral-100 shadow-md">
        <EnvelopeIcon className="w-32 h-32" />
        <h1 className="text-4xl font-bold text-neutral-900">Subscribe</h1>
        <p className="text-l text-neutral-500">
          Subscribe to our newsletter to get the latest courses and deals.
        </p>
        <form className="flex mt-4 w-full" onSubmit={submit}>
          <TextInput
            placeholder="Email Address"
            error={errors.emailAddress}
            {...register("emailAddress")}
            className="w-full mr-4"
          />
          <button className="btn btn-primary btn-sm">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
