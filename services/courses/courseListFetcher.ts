const courseListFetcher = async (page: number = 0) => {
  const response = await fetch("https://naszsklep-api.vercel.app/api/products");
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
