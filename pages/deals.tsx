import Course from "@/components/Courses/Course";
import courseListFetcher from "@/services/courses/courseListFetcher";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useQuery } from "react-query";

const Courses = () => {
  const { data, isLoading, isError } = useQuery(["courseList"], () =>
    courseListFetcher()
  );

  return (
    <>
      <Head>
        <title>Hot deals</title>
      </Head>
      <h1 className="text-4xl font-bold my-8 text-neutral-900">Hot deals</h1>
      {isLoading && <h2 className="text-3xl text-neutral-700">Loading...</h2>}
      {isError && <h2 className="text-3xl text-red-700">Error</h2>}
      {data && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-7">
          {data.slice(0, 8).map((x) => (
            <Course key={x.id} {...x} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Courses;
