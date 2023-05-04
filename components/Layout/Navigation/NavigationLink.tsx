import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const NavigationLink = ({ href, children, className }: NavigationLinkProps) => {
  const router = useRouter();

  return (
    <Link
      className={clsx(
        "p-4 hover:bg-gray-700 ease-in-out transition-all duration-300",
        isActiveRoute(router.route, href) && "border-primary border-b-4 pb-3",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

const isActiveRoute = (route: string, href: string) => {
  if (href === "/") {
    return href === route;
  }

  const mainRoutePart = route.split("/")[1] ?? "";
  const mainHrefPart = href.split("/")[1] ?? "";
  return mainRoutePart === mainHrefPart;
};

type NavigationLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default NavigationLink;
