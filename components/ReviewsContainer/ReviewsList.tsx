import { useQuery } from "@apollo/client";
import {
  GetProductReviewsDocument,
  ProductReviewFragmentDoc,
} from "@/graphql/generated/graphql";
import { useFragment } from "@/graphql/generated";
import Review from "./Review";

const ReviewsList = ({ slug }: ReviewsListProps) => {
  const { data, error, loading } = useQuery(GetProductReviewsDocument, {
    variables: {
      slug,
    },
  });
  const reviews = useFragment(ProductReviewFragmentDoc, data?.reviews);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading || !reviews) {
    return <p>Loading...</p>;
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
