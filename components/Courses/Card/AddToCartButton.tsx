import PlusIcon from "@/components/icons/PlusIcon";
import { CartItem } from "@/pages/cart/context/CartContext";
import useCartState from "@/pages/cart/context/useCartState";

const AddToCartButton = ({ item, size }: AddToCartButtonProps) => {
  const { addItem } = useCartState();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addItem({ ...item, quantity: 1 });
  };

  if (size === "icon") {
    return (
      <button className="btn btn-primary btn-sm btn-square" onClick={onClick}>
        <PlusIcon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button className="btn btn-primary" onClick={onClick}>
      <PlusIcon className="w-6 h-6 mr-4" /> Add to cart
    </button>
  );
};

type AddToCartButtonProps = {
  item: Omit<CartItem, "quantity">;
  size?: "icon" | "standard";
};

export default AddToCartButton;
