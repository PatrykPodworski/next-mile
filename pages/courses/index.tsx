import Head from "next/head";

const Courses = ({}: CoursesProps) => (
  <>
    <Head>
      <title>Courses list</title>
    </Head>
    <div className="flex flex-col items-center">
      <p className="text-xl font-bold text-amber-500">
        This is the courses list page.
      </p>
    </div>
  </>
);

type CoursesProps = {};

export default Courses;
