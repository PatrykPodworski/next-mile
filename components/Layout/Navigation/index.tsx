import NavigationLink from "./NavigationLink";

const Navigation = () => {
  return (
    <nav className="flex gap-2 bg-gray-800 text-white">
      <NavigationLink href={"/"} label="Home" />
      <NavigationLink href={"/courses"} label="Courses" />
      <NavigationLink href={"/contact"} label="Contact us" />
      <NavigationLink href={"/about"} label="About" />
    </nav>
  );
};

export default Navigation;
