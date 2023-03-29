import ErrorMessage from "@/components/ErrorMessage";
import LoadingIndicator from "@/components/LoadingIndicator";
import Pagination from "@/components/Pagination";
import usePagination from "@/components/Pagination/usePagination";
import courseListFetcher from "@/services/courses/courseListFetcher";
import Head from "next/head";
import { useQuery } from "react-query";
import CourseList from "../components/Courses/CourseList";

const DealsPage = () => {
  const { currentPage, ...props } = usePagination(0, 10);
  const { data, isLoading, isError } = useQuery(
    ["courseList", currentPage],
    () => courseListFetcher(currentPage)
  );

  return (
    <>
      <Head>
        <title>Hot deals</title>
      </Head>
      <h1 className="text-4xl font-bold my-4 text-neutral-900">Hot deals</h1>
      {isLoading && <LoadingIndicator />}
      {isError && <ErrorMessage />}
      {data && (
        <>
          <CourseList courses={data} />
          <Pagination current={currentPage} {...props} />
        </>
      )}
    </>
  );
};

export default DealsPage;
