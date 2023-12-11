import PlusIcon from "@/components/icons/PlusIcon";
import { CartItem } from "@/components/Cart/context/CartContext";
import useCartState from "@/components/Cart/context/useCartState";

const AddToCartButton = ({ id, size }: AddToCartButtonProps) => {
  const { addItem } = useCartState();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addItem(id);
  };

  if (size === "icon") {
    return (
      <button
        className="btn btn-primary btn-sm btn-square"
        onClick={onClick}
        data-testid="addToCartIconButton"
      >
        <PlusIcon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button className="btn-ghost btn btn-sm" onClick={onClick}>
      <PlusIcon className="w-6 h-6" /> Add to cart
    </button>
  );
};

type AddToCartButtonProps = {
  id: CartItem["id"];
  size?: "icon" | "standard";
};

export default AddToCartButton;
