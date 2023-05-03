import Link from "next/link";
import CourseImage from "../CourseImage";
import Rating from "../Rating";
import AddToCartButton from "./AddToCartButton";

const CourseCard = ({
  id,
  image,
  title,
  category,
  rating,
  price,
  description,
}: CourseCardProps) => (
  <li className="shadow-lg bg-neutral-50 overflow-hidden">
    <Link href={`/courses/${id}`}>
      <CourseImage src={image} alt={title} className="p-2" />
      <div className="p-3">
        <section className="flex justify-between items-center">
          <p className="text-sm text-neutral-500">{category}</p>
          <Rating rating={rating.rate} />
        </section>
        <h1 className="my-4 text-base text-neutral-900 font-bold">{title}</h1>
        <div className="flex justify-between items-center">
          <p className="text-md text-neutral-500 italic">{`${price} zł`}</p>
          <AddToCartButton
            item={{ id, title, description, image, price }}
            size="icon"
          />
        </div>
      </div>
    </Link>
  </li>
);

export type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: { rate: number };
  price: number;
};

export default CourseCard;
