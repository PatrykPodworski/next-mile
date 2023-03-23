import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const NavigationLink = ({ href, label }: NavigationLinkProps) => {
  const router = useRouter();

  return (
    <Link
      className={clsx(
        "p-4 pb-3",
        isActiveRoute(router.route, href) && "border-blue-500 border-b-4"
      )}
      href={href}
    >
      {label}
    </Link>
  );
};

const isActiveRoute = (route: string, href: string) => {
  if (href === "/") {
    return href === route;
  }

  return route.startsWith(href);
};

type NavigationLinkProps = {
  href: string;
  label: string;
};

export default NavigationLink;
