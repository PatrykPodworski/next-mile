import ApiCourse from "./ApiCourse";

const courseFetcher = async (id: string) => {
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${id}`
  );
  const data: ApiCourse = await response.json();

  return data;
};
export default courseFetcher;
