import Rating from "./Rating";
import Image from "next/image";

const Course = ({ image, title, category, rating, price }: CourseProps) => (
  <li className="shadow-lg bg-neutral-50 overflow-hidden">
    <div className="relative aspect-video">
      <Image src={image} alt={title} fill className="object-cover" />
    </div>
    <div className="p-2">
      <section className="flex justify-between items-center">
        <p className="text-sm text-neutral-500">{category}</p>
        <Rating rating={rating.rate} />
      </section>
      <h1 className="my-4 text-base text-neutral-900 font-bold">{title}</h1>
      <p className="text-sm text-neutral-500 italic">{`${price} zł`}</p>
    </div>
  </li>
);

type CourseProps = {
  title: string;
  image: string;
  category: string;
  rating: { rate: number };
  price: number;
};

export default Course;
