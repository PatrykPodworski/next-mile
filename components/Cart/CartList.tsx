import CartListItem from "./CartListItem";
import { CartItem } from "./context/CartContext";

const CartList = ({ items }: CartListProps) => {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((x) => (
        <CartListItem key={x.id} item={x} />
      ))}
    </ul>
  );
};

type CartListProps = {
  items: CartItem[];
};

export default CartList;
