import { ProductReviewFragment } from "@/graphql/generated/graphql";

const Review = ({
  review: { name, content, rating, headline },
}: ReviewProps) => {
  return (
    <li className="bg-white p-4 border-neutral-300 border rounded-lg">
      <div className="flex gap-4 content-between mb-4">
        <span className="text-base">{name}</span>
        {rating && <div>{rating}/5</div>}
      </div>
      <h2 className="font-semibold text-xl mb-2">{headline}</h2>
      <p>{content}</p>
    </li>
  );
};

type ReviewProps = {
  review: ProductReviewFragment;
};

export default Review;
