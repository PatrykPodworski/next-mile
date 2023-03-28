import CourseCard, { CourseCardProps } from "@/components/Courses/CourseCard";

const CourseList = ({ courses }: CourseListProps) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-7 mb-8">
    {courses.slice(0, 8).map((x) => (
      <CourseCard key={x.id} {...x} />
    ))}
  </ul>
);

type CourseListProps = {
  courses: CourseCardProps[];
};

export default CourseList;
