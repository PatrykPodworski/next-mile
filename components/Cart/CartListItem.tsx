import CourseImage from "@/components/Courses/CourseImage";
import { CartItem } from "./context/CartContext";
import useCartState from "./context/useCartState";
import { CartProductFragment } from "@/graphql/generated/graphql";

const CartListItem = ({
  id,
  images,
  name,
  price,
  description,
  quantity,
}: CartListItemProps) => {
  const { addItem, removeItem } = useCartState();

  return (
    <div className="flex items-center gap-8 border-neutral-200 border-t py-8">
      <CourseImage
        src={images[0].url}
        alt={name}
        className="shadow-md w-40 p-1"
      />
      <div className="w-96">
        <p className="text-lg font-bold text-neutral-900">{name}</p>
        <p className="truncate text-neutral-900">{description}</p>
        <p className="font-bold text-neutral-900">{price} zł</p>
      </div>
      <div className="btn-group btn-group-horizontal text-neutral-900">
        <button
          className="btn btn-sm btn-outline hover:btn-primary border-neutral-200"
          onClick={() => removeItem(id)}
        >
          -
        </button>
        <div className="border-y border-neutral-200 h-8 px-3 flex items-center">
          {quantity}
        </div>
        <button
          className="btn btn-sm btn-outline hover:btn-primary border-neutral-200"
          onClick={() => addItem(id)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export type CartListItemProps = CartProductFragment & { quantity: number };

export default CartListItem;
