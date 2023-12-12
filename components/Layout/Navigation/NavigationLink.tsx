import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const NavigationLink = ({ href, children, className }: NavigationLinkProps) => {
  const router = useRouter();
  const isActive = isActiveRoute(router.pathname, href);

  return (
    <Link
      className={clsx("p-4 hover:bg-gray-700 relative", className)}
      href={href}
    >
      <>
        <div
          className={clsx(
            "absolute bottom-0 left-0 w-full h-1 bg-primary transition-opacity duration-300",
            isActive ? "opacity-100" : "opacity-0"
          )}
        />
        {children}
      </>
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
