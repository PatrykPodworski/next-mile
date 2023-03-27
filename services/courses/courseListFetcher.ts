import qs from "qs";

const PAGE_SIZE = 25;

const courseListFetcher = async (page: number = 0) => {
  const query = qs.stringify({ take: PAGE_SIZE, offset: page * PAGE_SIZE });
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products?${query}`
  );
  const data: CoursesApiResponse[] = await response.json();

  return data;
};

type CoursesApiResponse = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
};

export default courseListFetcher;
