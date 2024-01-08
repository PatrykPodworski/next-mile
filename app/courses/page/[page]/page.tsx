import CourseList from "@/components/Courses/List/CourseList";
import LinkPagination from "@/components/Pagination/LinkPagination";
import apolloClient from "@/graphql/apolloClient";
import { useFragment as getFragmentData } from "@/graphql/generated";
import {
  GetProductsDocument,
  GetProductsSlugDocument,
  ProductListItemFragmentDoc,
} from "@/graphql/generated/graphql";
import { notFound } from "next/navigation";

const Page = async ({ params: { page } }: { params: { page: string } }) => {
  const pageIndex = parseInt(page, 10);
  const { data, error } = await getProductPage(pageIndex);
  const numberOfPages = await getNumberOfPages();

  if (error) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-neutral-900">
        Courses selected for you
      </h1>
      <CourseList courses={data} />
      <LinkPagination
        current={pageIndex}
        pagesCount={numberOfPages}
        baseHref="/courses/page"
      />
    </>
  );
};

export default Page;

const PRODUCTS_PER_PAGE = 8;

export const generateStaticParams = async () => {
  const numberOfPages = await getNumberOfPages();

  return Array.from(Array(numberOfPages).keys()).map((x) => ({
    page: (x + 1).toString(),
  }));
};

const getProductPage = async (pageIndex: number) => {
  const { data, error } = await apolloClient.query({
    query: GetProductsDocument,
    variables: {
      first: PRODUCTS_PER_PAGE,
      skip: (pageIndex - 1) * PRODUCTS_PER_PAGE,
    },
  });

  return {
    data: getFragmentData(ProductListItemFragmentDoc, data.products),
    error,
  };
};

const getNumberOfPages = async () => {
  const { data } = await apolloClient.query({
    query: GetProductsSlugDocument,
  });

  return Math.ceil(data.products.length / PRODUCTS_PER_PAGE);
};
