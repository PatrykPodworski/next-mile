import { useQuery } from "@apollo/client";
import { useFragment } from "@/graphql/generated";
import {
  CartProductFragmentDoc,
  GetCartProductsDocument,
} from "@/graphql/generated/graphql";
import useCartState from "@/components/Cart/context/useCartState";

const useGetCartItems = () => {
  const { items } = useCartState();

  const { data, loading, error } = useQuery(GetCartProductsDocument, {
    variables: { ids: items.map((x) => x.id) },
  });
  const products = useFragment(CartProductFragmentDoc, data?.products) ?? [];

  const productsWithQuantity = products.map((product) => {
    const item = items.find((x) => x.id === product.id);
    return {
      ...product,
      quantity: item?.quantity ?? 0,
    };
  });

  const itemsCount = productsWithQuantity.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalPrice = productsWithQuantity.reduce(
    (acc, item) => acc + (item.price ?? 0) * item.quantity,
    0
  );

  return {
    items: productsWithQuantity,
    loading,
    error,
    itemsCount,
    totalPrice,
  };
};

export default useGetCartItems;
