import { Metadata } from "next";

const title = "Next Mile";
const description =
  "Next Mile is a platform for learning new skills in a fun and engaging way.";

const defaultMetadata: Metadata = {
  title,
  description,
  openGraph: {
    url: "https://next-mile.vercel.app",
    title,
    description,
    siteName: "Next Mile",
  },
};

export default defaultMetadata;
