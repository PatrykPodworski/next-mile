import CourseImage from "@/components/Courses/CourseImage";
import { CartItem } from "./context/CartContext";
import useCartState from "./context/useCartState";

const CartListItem = ({ item }: CartListItemProps) => {
  const { addItem, removeItem } = useCartState();

  return (
    <div className="flex items-center gap-8">
      <CourseImage
        src={item.image}
        alt={item.title}
        className="shadow-md w-40 p-1"
      />
      <div className="w-96">
        <p className="text-lg font-bold text-neutral-900">{item.title}</p>
        <p className="truncate text-neutral-900">{item.description}</p>
        <p className="font-bold text-neutral-900">{item.price} zł</p>
      </div>
      <div className="btn-group btn-group-horizontal text-neutral-900">
        <button
          className="btn btn-sm btn-outline hover:btn-primary border-neutral-900"
          onClick={() => removeItem(item.id)}
        >
          -
        </button>
        <div className="border-y border-neutral-900 h-8 px-3 flex items-center">
          {item.quantity}
        </div>
        <button
          className="btn btn-sm btn-outline hover:btn-primary border-neutral-900"
          onClick={() => addItem(item)}
        >
          +
        </button>
      </div>
    </div>
  );
};

type CartListItemProps = {
  item: CartItem;
};

export default CartListItem;
