const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="flex flex-col gap-4 items-center h-96 justify-center text-neutral-900">
    <strong className="text-2xl font-bold">Error!</strong>
    <span className="text-xl">{message || "Something went wrong"}</span>
  </div>
);

type ErrorMessageProps = {
  message?: string;
};

export default ErrorMessage;
