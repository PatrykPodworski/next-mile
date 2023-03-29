import Rating from "./Rating";
import Link from "next/link";
import Image from "@/components/Image";

const CourseCard = ({
  id,
  image,
  title,
  category,
  rating,
  price,
}: CourseCardProps) => (
  <li className="shadow-lg bg-neutral-50 overflow-hidden">
    <Link href={`/courses/${id}`}>
      <Image src={image} alt={title} />
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

export type CourseCardProps = {
  id: string;
  title: string;
  image: string;
  category: string;
  rating: { rate: number };
  price: number;
};

export default CourseCard;
