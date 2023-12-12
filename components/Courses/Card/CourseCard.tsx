import Link from "next/link";
import CourseImage from "../CourseImage";
import AddToCartButton from "./AddToCartButton";
import { ProductListItemFragment } from "@/graphql/generated/graphql";

const CourseCard = ({
  id,
  images,
  name,
  categories,
  price,
  slug,
}: CourseCardProps) => (
  <li className="bg-white rounded-lg overflow-hidden">
    <Link href={`/courses/${slug}`}>
      <CourseImage src={images[0]?.url} alt={name} sizes="364px" />
      <div className="p-2">
        <section className="flex justify-between items-center">
          {categories.map((x) => (
            <p className="text-sm text-neutral-500" key={x.id}>
              {x.name}
            </p>
          ))}
        </section>
        <h1 className="text-base text-neutral-900 font-bold">{name}</h1>
        <div className="flex gap-4 justify-between items-center">
          <p className="text-md text-neutral-500 italic">{`${
            price / 100
          } zł`}</p>
          <AddToCartButton id={id} size="standard" />
        </div>
      </div>
    </Link>
  </li>
);

export type CourseCardProps = ProductListItemFragment;

export default CourseCard;
