import EnvelopeIcon from "@/components/icons/EnvelopeIcon";
import NewsletterForm from "./NewsletterForm";

const ContactPage = () => {
  return (
    <section className="m-auto flex flex-col items-center gap-4 max-w-lg p-8 rounded-lg border-neutral-300 border">
      <EnvelopeIcon className="w-32 h-32" />
      <h1 className="text-4xl font-bold text-neutral-900">Subscribe</h1>
      <p className="text-l text-neutral-500">
        Subscribe to our newsletter to get the latest courses and deals.
      </p>
      <NewsletterForm />
    </section>
  );
};

export default ContactPage;
