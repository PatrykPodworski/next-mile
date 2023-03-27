import qs from "qs";
import ApiCourse from "./ApiCourse";

const PAGE_SIZE = 25;

const courseListFetcher = async (page: number = 0) => {
  const query = qs.stringify({ take: PAGE_SIZE, offset: page * PAGE_SIZE });
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products?${query}`
  );
  const data: ApiCourse[] = await response.json();

  return data;
};

export default courseListFetcher;
