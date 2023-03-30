import Head from "next/head";
import { useQuery } from "react-query";
import CourseListSkeleton from "@/components/Courses/List/CourseListSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import Pagination from "@/components/Pagination";
import usePagination from "@/components/Pagination/usePagination";
import CourseList from "../components/Courses/List/CourseList";
import courseListFetcher from "@/services/courses/courseListFetcher";

const DealsPage = () => {
  const { currentPage, ...props } = usePagination(0, 10);
  const { data, isLoading, isError } = useQuery(
    ["courseList", currentPage],
    () => courseListFetcher(currentPage)
  );

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Head>
        <title>Hot deals</title>
      </Head>
      <h1 className="text-4xl font-bold my-4 text-neutral-900">Hot deals</h1>
      {isLoading || !data ? (
        <CourseListSkeleton />
      ) : (
        <CourseList courses={data} />
      )}
      <Pagination current={currentPage} {...props} />
    </>
  );
};

export default DealsPage;
