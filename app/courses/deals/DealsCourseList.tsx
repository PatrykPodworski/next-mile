"use client";

import CourseList from "@/components/Courses/List/CourseList";
import CourseListSkeleton from "@/components/Courses/List/CourseListSkeleton";
import { useFragment } from "@/graphql/generated";
import {
  GetProductsDocument,
  ProductListItemFragmentDoc,
} from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client";
import { notFound } from "next/navigation";

const PRODUCTS_PER_PAGE = 4;

const DealsCourseList = () => {
  const { data, error, loading } = useQuery(GetProductsDocument, {
    variables: {
      first: PRODUCTS_PER_PAGE,
      skip: 0,
    },
  });
  const products = useFragment(ProductListItemFragmentDoc, data?.products);

  if (error) {
    notFound();
  }

  if (loading || !products) {
    return <CourseListSkeleton />;
  }

  return <CourseList courses={products} />;
};

export default DealsCourseList;
