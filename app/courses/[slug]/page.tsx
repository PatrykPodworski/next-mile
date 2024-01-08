import AddToCartButton from "@/components/Courses/Card/AddToCartButton";
import CourseImage from "@/components/Courses/CourseImage";
import Markdown from "@/components/Markdown";
import ChevronLeft from "@/components/icons/ChevronLeft";
import apolloClient from "@/graphql/apolloClient";
import { useFragment as getFragmentData } from "@/graphql/generated";
import {
  GetProductDocument,
  GetProductsSlugDocument,
  ProductDetailsFragmentDoc,
} from "@/graphql/generated/graphql";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReviewsContainer from "./ReviewsContainer";

const CourseDetailsPage = async ({ params: { slug } }: Props) => {
  const product = await getCourseDetails(slug);

  return (
    <>
      <Link
        href={"/courses/page/1"}
        className="flex gap-2 text-base text-blue-300 hover:text-blue-500 transition-all duration-300 items-center"
      >
        <ChevronLeft className="w-4 h-4" /> Go back
      </Link>
      <div className="flex gap-8 my-8">
        <CourseImage
          src={product.imageUrl}
          alt={product.name}
          className="rounded-lg basis-2/3 overflow-hidden"
          sizes="1000px"
        />
        <div>
          <h1 className="text-2xl font-bold mb-4 text-neutral-900">
            {product.name}
          </h1>
          <div className="flex items-center gap-8">
            <p className="text-lg text-neutral-700 italic shrink-0">{`${
              product.price / 100
            } zł`}</p>
            <AddToCartButton id={product.id} size="standard" />
          </div>
        </div>
      </div>
      <article className="prose lg:prose-xl">
        <Markdown source={product.description} />
      </article>
      <ReviewsContainer slug={product.slug} />
    </>
  );
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

  return data.products.map((x) => ({
    slug: x.slug,
  }));
};

export const generateMetadata = async ({
  params: { slug },
}: Props): Promise<Metadata> => {
  const product = await getCourseDetails(slug);

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `https://next-mile.vercel.app/courses/${product.slug}`,
    },
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
