import { Metadata } from "next";

const title = "Next Mile";
const description =
  "Next Mile is a platform for learning new skills in a fun and engaging way.";

const baseUrl = process.env.VERCEL_URL;
if (!baseUrl) {
  throw new Error("Missing VERCEL_URL");
}

const defaultMetadata: Metadata = {
  title,
  description,
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  openGraph: {
    url: "https://next-mile.vercel.app",
    title,
    description,
    siteName: "Next Mile",
  },
};

export default defaultMetadata;
