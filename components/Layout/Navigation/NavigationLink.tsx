"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationLink = ({ href, children, className }: NavigationLinkProps) => {
  const pathName = usePathname();
  const isActive = isActiveRoute(pathName, href);

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

const isActiveRoute = (route: string | null, href: string) => {
  if (href === "/") {
    return href === route;
  }

  if (!route) {
    return false;
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
