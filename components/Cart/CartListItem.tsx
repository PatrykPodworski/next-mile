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
  const imageUrl = images[0]?.url;

  return (
    <div className="flex items-center gap-3 border-neutral-300 border-t pt-5 first:border-0">
      {imageUrl && (
        <CourseImage
          src={imageUrl}
          alt={name}
          className="w-40 rounded-lg overflow-hidden shrink-0"
          sizes="160"
        />
      )}
      <div className="grow">
        <p className="text-lg font-bold text-neutral-900">{name}</p>
        <p className="text-neutral-900 truncate max-w-lg">{description}</p>
        <p className="font-bold text-neutral-900">{price / 100} zł</p>
      </div>
      <div className="shrink-0 flex flex-col">
        <button
          className="btn btn-sm border-neutral-300"
          onClick={() => addItem(id)}
        >
          +
        </button>
        <div className="h-8 px-3 flex items-center">{quantity}</div>

        <button
          className="btn btn-sm border-neutral-300"
          onClick={() => removeItem(id)}
        >
          -
        </button>
      </div>
    </div>
  );
};

export type CartListItemProps = CartProductFragment & { quantity: number };

export default CartListItem;
