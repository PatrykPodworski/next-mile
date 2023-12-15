"use client";
import { useQuery } from "@apollo/client";
import {
  GetProductReviewsDocument,
  ProductReviewFragmentDoc,
} from "@/graphql/generated/graphql";
import { useFragment } from "@/graphql/generated";
import Review from "./Review";
import ReviewsListSkeleton from "./ReviewsListSkeleton";

const ReviewsList = ({ slug }: ReviewsListProps) => {
  const { data, loading } = useQuery(GetProductReviewsDocument, {
    variables: {
      slug,
    },
  });
  const reviews = useFragment(ProductReviewFragmentDoc, data?.reviews);

  if (loading || !reviews) {
    return <ReviewsListSkeleton />;
  }

  if (reviews.length === 0) {
    return (
      <p className="basis-1/2 text-lg">No reviews yet. Be the first! 🎉</p>
    );
  }

  return (
    <ul className="basis-1/2 flex flex-col gap-4">
      {reviews.map((x) => (
        <Review review={x} key={x.id} />
      ))}
    </ul>
  );
};

type ReviewsListProps = {
  slug: string;
};

export default ReviewsList;
