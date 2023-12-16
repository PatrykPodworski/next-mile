import { useQuery } from "@apollo/client";
import CourseListSkeleton from "@/components/Courses/List/CourseListSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import CourseList from "@/components/Courses/List/CourseList";
import {
  GetProductsDocument,
  ProductListItemFragmentDoc,
} from "@/graphql/generated/graphql";
import { useFragment } from "@/graphql/generated";

const DealsPage = () => {
  const { data, error, loading } = useQuery(GetProductsDocument, {
    variables: {
      first: PRODUCTS_PER_PAGE,
      skip: 0,
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
    </>
  );
};

const PRODUCTS_PER_PAGE = 4;

export default DealsPage;
