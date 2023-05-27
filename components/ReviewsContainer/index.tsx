import ReviewForm from "./ReviewForm";

const ReviewsContainer = ({ slug }: ReviewsContainerProps) => {
  return <ReviewForm slug={slug} />;
};

type ReviewsContainerProps = {
  slug: string;
};

export default ReviewsContainer;
