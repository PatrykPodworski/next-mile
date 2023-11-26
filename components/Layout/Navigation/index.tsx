import NavigationLink from "./NavigationLink";
import CartLink from "./CartLink";
import User from "./User";

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-5xl m-auto items-center flex justify-between">
        <div className="flex gap-2">
          <NavigationLink href="/">Home</NavigationLink>
          <NavigationLink href="/courses/page/1">Courses</NavigationLink>
          <NavigationLink href="/deals">Deals</NavigationLink>
          <NavigationLink href="/about">About</NavigationLink>
          <NavigationLink href="/contact">Contact</NavigationLink>
        </div>
        <div className="flex gap-4 items-center">
          <CartLink />
          <User />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
