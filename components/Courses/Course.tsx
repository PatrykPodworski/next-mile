import Rating from "./Rating";
import Image from "next/image";
import Link from "next/link";

const Course = ({ id, image, title, category, rating, price }: CourseProps) => (
  <li className="shadow-lg bg-neutral-50 overflow-hidden">
    <Link href={`/courses/${id}`}>
      <div className="relative aspect-video">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-3">
        <section className="flex justify-between items-center">
          <p className="text-sm text-neutral-500">{category}</p>
          <Rating rating={rating.rate} />
        </section>
        <h1 className="my-4 text-base text-neutral-900 font-bold">{title}</h1>
        <p className="text-sm text-neutral-500 italic">{`${price} zł`}</p>
      </div>
    </Link>
  </li>
);

type CourseProps = {
  id: string;
  title: string;
  image: string;
  category: string;
  rating: { rate: number };
  price: number;
};

export default Course;
