import { ReactNode } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = ({ children }: LayoutProps) => (
  <div className="flex flex-col min-h-screen">
    <Navigation />
    <main className="grow">{children}</main>
    <Footer />
  </div>
);

type LayoutProps = {
  children: ReactNode;
};

export default Layout;
