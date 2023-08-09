const SubmitMessage = ({ hasFailed }: SubmitMessageProps) =>
  hasFailed ? (
    <p className="text-l font-bold text-red-500">
      Something went wrong. Please try again.
    </p>
  ) : (
    <p className="text-l font-bold text-green-500">
      Thank you for subscribing!
    </p>
  );

type SubmitMessageProps = {
  hasFailed: boolean;
};

export default SubmitMessage;
