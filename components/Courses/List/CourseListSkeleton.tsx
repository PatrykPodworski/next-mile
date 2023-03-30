import CourseCardSkeleton from "../Card/CourseCardSkeleton";

const CourseListSkeleton = () => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-7 mb-8">
    {[...Array(16)].map((_, i) => (
      <CourseCardSkeleton key={i} />
    ))}
  </ul>
);

export default CourseListSkeleton;
