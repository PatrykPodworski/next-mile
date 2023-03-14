import Link from "next/link";
import { useRouter } from "next/router";

const NavigationLink = ({ href, label }: NavigationLinkProps) => {
  const router = useRouter();

  return (
    <Link
      className={`p-4 pb-3 border-blue-500 
       ${router.route === href ? "border-b-4" : ""}`}
      href={href}
    >
      {label}
    </Link>
  );
};
type NavigationLinkProps = {
  href: string;
  label: string;
};

export default NavigationLink;
