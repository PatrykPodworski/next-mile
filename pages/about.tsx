import { GetProductsDocument } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client";

const About = () => {
  const { loading, error, data } = useQuery(GetProductsDocument);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-xl font-bold text-violet-500">
          This is the about page.
        </p>

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
};

export default About;
