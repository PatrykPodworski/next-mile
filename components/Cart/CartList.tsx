import FaceFrownIcon from "../icons/FaceFrownIcon";
import CartListItem, { CartListItemProps } from "./CartListItem";

const CartList = ({ items }: CartListProps) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <FaceFrownIcon className="w-40 h-40" />
        <h1 className="text-4xl font-bold">Your cart is empty</h1>
        <p className="text-lg">Please add some items to your cart.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {items.map((x) => (
        <CartListItem key={x.id} {...x} />
      ))}
    </ul>
  );
};

type CartListProps = {
  items: CartListItemProps[];
};

export default CartList;
