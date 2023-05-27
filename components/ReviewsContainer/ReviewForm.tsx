import { CreateProductReviewMutationDocument } from "@/graphql/generated/graphql";
import { useMutation } from "@apollo/client";

const ReviewForm = ({ slug }: ReviewFormProps) => {
  const [createProductReview, { data, loading, error }] = useMutation(
    CreateProductReviewMutationDocument,
    {
      variables: {
        review: {
          name: "Damian",
          email: "damian@patryk.pl",
          headline: "Very good long sleeve",
          content: "Very good long sleeve, I recommend it to everyone!",
          rating: 5,
          product: {
            connect: {
              slug: slug,
            },
          },
        },
      },
    }
  );

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => createProductReview()}
    >
      Create review
    </button>
  );
};

type ReviewFormProps = {
  slug: string;
};

export default ReviewForm;
