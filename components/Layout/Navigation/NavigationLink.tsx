"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationLink = ({
  href,
  children,
  className,
  activeMatch,
}: NavigationLinkProps) => {
  const pathName = usePathname();
  const isActive = isActiveRoute(pathName, activeMatch ?? href);

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
  if (route === "/") {
    return route === href;
  }
  return route.startsWith(href);
};

type NavigationLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeMatch?: string;
};

export default NavigationLink;
