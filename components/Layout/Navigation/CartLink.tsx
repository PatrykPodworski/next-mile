import ShoppingBag from "@/components/icons/ShoppingBag";
import NavigationLink from "./NavigationLink";
import useCartState from "@/pages/cart/context/useCartState";

const CartLink = () => {
  const { items } = useCartState();
  const numberOfItems = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <NavigationLink href="/cart" className="flex gap-1 items-center">
      <ShoppingBag />
      {numberOfItems && (
        <div className="badge badge-sm badge-primary">{numberOfItems}</div>
      )}
    </NavigationLink>
  );
};

export default CartLink;
