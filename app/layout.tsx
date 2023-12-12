import Layout from "@/components/Layout";
import Providers from "@/utils/Providers";
import defaultMetadata from "./defaultMetadata";
import "@/styles/globals.css";

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white antialiased">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
