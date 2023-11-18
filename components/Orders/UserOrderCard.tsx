import Link from "next/link";
import CourseImage from "../Courses/CourseImage";
import CardItem from "./CardItem";

const UserOrderCard = ({
  name,
  createdAt,
  id,
  status,
  total,
  numberOfItems,
  imageUrl,
}: UserOrderCardProps) => (
  <div className="bg-white p-4 shadow flex gap-4">
    <section className="flex-shrink-0 w-2/3">
      <div className="flex gap-2 items-baseline justify-between">
        <p className="font-bold text-lg">Order: {name}</p>
        <p className="text-xs">{createdAt}</p>
      </div>
      <div className="flex gap-8">
        <CardItemGroup>
          <CardItem label="Order number" value={id} />
          <CardItem label="Status" value={status} />
        </CardItemGroup>
        <CardItemGroup>
          <CardItem label="Number of items" value={numberOfItems} />
          <CardItem label="Total" value={`${total} zł`} />
        </CardItemGroup>
      </div>
    </section>
    <div className="flex flex-col gap-4">
      <Link
        className="self-center font-bold link text-sm leading-7 "
        href={`/orders/${id}`}
      >
        View details
      </Link>
      {imageUrl && (
        <CourseImage className="max-h-40" src={imageUrl} alt={name} />
      )}
    </div>
  </div>
);

const CardItemGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col">{children}</div>
);

export type UserOrderCardProps = {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  total: number;
  numberOfItems: number;
  imageUrl?: string;
};

export default UserOrderCard;
