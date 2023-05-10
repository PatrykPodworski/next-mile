import { gql, useQuery } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      description
      images {
        url
      }
    }
  }
`;

const About = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

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
