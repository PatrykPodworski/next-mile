import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";

const ReviewsContainer = ({ slug }: ReviewsContainerProps) => (
  <>
    <h1 className="text-4xl font-bold my-4 text-neutral-900">Reviews</h1>
    <div className="flex gap-16">
      <ReviewsList slug={slug} />
      <ReviewForm slug={slug} />
    </div>
  </>
);

type ReviewsContainerProps = {
  slug: string;
};

export default ReviewsContainer;
