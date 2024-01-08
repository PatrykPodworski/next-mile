import { ReactNode } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = ({ children }: LayoutProps) => (
  <div className="flex flex-col min-h-screen">
    <Navigation />
    <main className="max-w-5xl grow m-auto my-4 px-1 sm:px-2 md:px-4 w-full">
      {children}
    </main>
    <Footer />
  </div>
);

type LayoutProps = {
  children: ReactNode;
};

export default Layout;
