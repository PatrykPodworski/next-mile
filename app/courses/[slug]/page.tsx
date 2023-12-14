import apolloClient from "@/graphql/apolloClient";
import { useFragment as getFragmentData } from "@/graphql/generated";
import {
  GetProductDocument,
  GetProductsSlugDocument,
  ProductDetailsFragmentDoc,
} from "@/graphql/generated/graphql";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const CourseDetailsPage = async ({ params: { slug } }: Props) => {
  const product = await getCourseDetails(slug);

  return <div>{JSON.stringify(product)}</div>;
};

const getCourseDetails = async (slug: string) => {
  const { data } = await apolloClient.query({
    query: GetProductDocument,
    variables: {
      slug,
    },
  });

  const product = getFragmentData(ProductDetailsFragmentDoc, data.product);

  if (!product) {
    return notFound();
  }

  const imageUrl = product.images[0]?.url;

  return { ...product, imageUrl };
};

export const generateStaticParams = async () => {
  const { data } = await apolloClient.query({
    query: GetProductsSlugDocument,
  });

  return data.products.map((x) => {
    x.slug;
  });
};

export const generateMetadata = async ({ params: { slug } }: Props) => {
  const product = await getCourseDetails(slug);

  return {
    title: product.name,
    description: product.description,
    canonical: `https://next-mile.vercel.app/courses/${product.slug}`,
    openGraph: {
      url: `https://next-mile.vercel.app/courses/${product.slug}`,
      title: product.name,
      images: [
        {
          url: product.imageUrl,
          alt: product.name,
          type: "image/jpeg",
        },
      ],
    },
  };
};

type Props = {
  params: {
    slug: string;
  };
};

export default CourseDetailsPage;
