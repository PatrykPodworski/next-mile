const HomePage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold" data-testid="success-heading">
          Welcome to Our Online Store!
        </h1>
        <p className="text-lg text-gray-600 max-w-prose">
          Explore our vast collection of courses and discover the perfect topics
          that will help you enhance your skills and knowledge. Still, you
          can&apos;t but anything.
        </p>
      </div>
    </>
  );
};

export default HomePage;
