import Rating from "../Rating";
import Link from "next/link";
import Image from "next/image";

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
      <div className="aspect-video bg-white p-2">
        <Image
          src={image}
          alt={title}
          width={16}
          height={9}
          className="object-contain h-full w-auto mx-auto"
          sizes="100vw"
        />
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

export type CourseCardProps = {
  id: string;
  title: string;
  image: string;
  category: string;
  rating: { rate: number };
  price: number;
};

export default CourseCard;
