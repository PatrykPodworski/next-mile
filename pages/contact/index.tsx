import EnvelopeIcon from "@/components/icons/EnvelopeIcon";

const Contact = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <section className="flex flex-col items-center gap-4 max-w-lg p-8 rounded-lg bg-neutral-100 shadow-md">
        <EnvelopeIcon className="w-32 h-32" />
        <h1 className="text-4xl font-bold text-neutral-900">Subscribe</h1>
        <p className="text-l text-neutral-500">
          Subscribe to our newsletter to get the latest courses and deals.
        </p>
        <form className="flex mt-4 w-full">
          <input
            type="email"
            placeholder="Your email address"
            className="input input-bordered grow mr-4"
          />
          <button className="btn btn-primary">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
