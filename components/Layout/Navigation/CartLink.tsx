import ShoppingBag from "@/components/icons/ShoppingBag";
import { useCartState } from "@/pages/cart/CartContext";
import NavigationLink from "./NavigationLink";

const CartLink = () => {
  const cartState = useCartState();
  const numberOfItems = cartState.items.reduce((acc, item) => {
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
