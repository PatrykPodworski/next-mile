const CourseCardSkeleton = () => (
  <li className="shadow-lg bg-neutral-50 overflow-hidden">
    <div className="aspect-video bg-white p-2" />
    <div className="p-3">
      <section className="flex justify-between items-center">
        <div className="w-1/2 h-3 m-1 bg-neutral-200 rounded animate-pulse" />
        <div className="w-1/4 h-3 m-1 bg-neutral-200 rounded animate-pulse" />
      </section>
      <div className="my-5 w-3/4 h-4 bg-neutral-200 rounded animate-pulse" />
      <div className="w-1/2 h-3 m-1 bg-neutral-200 rounded animate-pulse" />
    </div>
  </li>
);

export default CourseCardSkeleton;
