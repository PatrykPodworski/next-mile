import ShoppingBag from "@/components/icons/ShoppingBag";
import NavigationLink from "./NavigationLink";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-5xl m-auto items-center flex justify-between">
        <div className="flex gap-2">
          <NavigationLink href="/">Home</NavigationLink>
          <NavigationLink href="/courses/page/1">Courses</NavigationLink>
          <NavigationLink href="/deals">Deals</NavigationLink>
          <NavigationLink href="/about">About</NavigationLink>
        </div>
        <NavigationLink href="/cart">
          <ShoppingBag />
        </NavigationLink>
      </div>
    </nav>
  );
};

export default Navigation;
