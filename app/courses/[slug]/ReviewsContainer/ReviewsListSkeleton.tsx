const ReviewsListSkeleton = () => {
  return (
    <ul className="basis-1/2 flex flex-col gap-4">
      {[1, 2, 3, 4].map((x) => (
        <li
          className="shadow-lg bg-neutral-200 animate-pulse h-24 w-full"
          key={x}
        ></li>
      ))}
    </ul>
  );
};

export default ReviewsListSkeleton;
