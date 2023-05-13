import CartListItem, { CartListItemProps } from "./CartListItem";

const CartList = ({ items }: CartListProps) => {
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
