import clsx from "clsx";

const Rating = ({ rating }: RatingProps) => (
  <p
    className={clsx(
      "text-sm font-bold",
      rating <= 2 && "text-red-700",
      rating > 2 && rating <= 3.5 && "text-amber-600",
      rating > 3.5 && "text-green-700"
    )}
  >
    {rating}
  </p>
);

type RatingProps = {
  rating: number;
};

export default Rating;
