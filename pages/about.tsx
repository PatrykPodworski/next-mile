import { GetProductsDocument } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client";

const About = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-xl font-bold text-violet-500">
          This is the about page.
        </p>
      </div>
    </>
  );
};

export default About;
