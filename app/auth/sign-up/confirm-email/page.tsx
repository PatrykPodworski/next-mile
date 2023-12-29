const confirmEmailPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold" data-testid="success-heading">
          Thank you for creating an account!
        </h1>
        <p className="text-lg">
          Please check your email and click on the confirmation link to activate
          your account.
        </p>
      </div>
    </>
  );
};

export default confirmEmailPage;
