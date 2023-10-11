import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const Cancel = () => {
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">Order Canceled</h1>
      <p className="text-lg">Your order has been canceled.</p>
    </main>
  );
};

export default Cancel;
