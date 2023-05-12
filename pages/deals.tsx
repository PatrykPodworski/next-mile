import CourseListSkeleton from "@/components/Courses/List/CourseListSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import Pagination from "@/components/Pagination";
import usePagination from "@/components/Pagination/usePagination";
import CourseList from "../components/Courses/List/CourseList";
import { useQuery } from "@apollo/client";
import {
  GetProductsDocument,
  ProductListItemFragmentDoc,
} from "@/graphql/generated/graphql";
import { useFragment } from "@/graphql/generated";

const DealsPage = () => {
  const { currentPage, ...props } = usePagination(0, 10);

  const { data, error, loading } = useQuery(GetProductsDocument, {
    variables: {
      first: PRODUCTS_PER_PAGE,
      skip: currentPage * PRODUCTS_PER_PAGE,
    },
  });
  const products = useFragment(ProductListItemFragmentDoc, data?.products);

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <h1 className="text-4xl font-bold my-4 text-neutral-900">Hot deals</h1>
      {loading || !products ? (
        <CourseListSkeleton />
      ) : (
        <CourseList courses={products} />
      )}
      <Pagination current={currentPage} {...props} />
    </>
  );
};

const PRODUCTS_PER_PAGE = 4;

export default DealsPage;
