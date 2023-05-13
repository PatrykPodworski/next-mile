import Link from "next/link";
import CourseImage from "../CourseImage";
import Rating from "../Rating";
import AddToCartButton from "./AddToCartButton";
import { ProductListItemFragment } from "@/graphql/generated/graphql";

const CourseCard = ({
  id,
  images,
  name,
  categories,
  price,
  description,
  slug,
}: CourseCardProps) => (
  <li className="shadow-lg bg-neutral-50 overflow-hidden">
    <Link href={`/courses/${slug}`}>
      <CourseImage src={images[0].url} alt={name} className="p-2" />
      <div className="p-3">
        <section className="flex justify-between items-center">
          {categories.map((x) => (
            <p className="text-sm text-neutral-500" key={x.id}>
              {x.name}
            </p>
          ))}
          <Rating rating={3} />
        </section>
        <h1 className="my-4 text-base text-neutral-900 font-bold">{name}</h1>
        <div className="flex justify-between items-center">
          <p className="text-md text-neutral-500 italic">{`${price} zł`}</p>
          <AddToCartButton id={id} size="icon" />
        </div>
      </div>
    </Link>
  </li>
);

export type CourseCardProps = ProductListItemFragment;

export default CourseCard;
