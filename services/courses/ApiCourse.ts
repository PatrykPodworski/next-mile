type ApiCourse = {
  id: string;
  title: string;
  price: number;
  description: string;
  longDescription: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
};

export default ApiCourse;
