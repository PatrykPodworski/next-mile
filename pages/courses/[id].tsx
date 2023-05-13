import CourseImage from "@/components/Courses/CourseImage";
import Markdown from "@/components/Markdown";
import ChevronLeft from "@/components/icons/ChevronLeft";
import apolloClient from "@/graphql/apolloClient";
import { useFragment } from "@/graphql/generated";
import {
  GetProductDocument,
  GetProductsSlugDocument,
  ProductDetailsFragmentDoc,
} from "@/graphql/generated/graphql";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo } from "next-seo";
import Link from "next/link";

const Course = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <NextSeo
        title={data.name}
        description={data.description}
        canonical={`https://next-mile.vercel.app/courses/${data.slug}`}
        openGraph={{
          url: `https://next-mile.vercel.app/courses/${data.slug}`,
          title: data.name,
          images: [
            {
              url: data.images[0].url,
              alt: data.name,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <Link
        href={"/courses/page/1"}
        className="flex gap-2 text-base text-blue-300 hover:text-blue-500 transition-all duration-300 items-center"
      >
        <ChevronLeft className="w-4 h-4" /> Go back
      </Link>
      <div className="flex gap-8 my-8">
        <CourseImage
          src={data.images[0].url}
          alt={data.name}
          className="p-2 shadow-xl basis-2/3"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4 text-neutral-900">
            {data.name}
          </h1>
          <div className="flex items-center gap-8">
            <p className="text-lg text-neutral-700 italic shrink-0">{`${data.price} zł`}</p>
            {/* <AddToCartButton item={data} /> */}
          </div>
        </div>
      </div>
      <article className="prose lg:prose-xl">
        <Markdown {...data.mdxDescription} />
      </article>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const { data } = await apolloClient.query({
    query: GetProductsSlugDocument,
  });

  return {
    paths: data.products.map((x) => ({
      params: {
        id: x.slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ id: string }>) => {
  if (!params?.id) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { data } = await apolloClient.query({
    query: GetProductDocument,
    variables: {
      slug: params.id,
    },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const product = useFragment(ProductDetailsFragmentDoc, data.product);

  if (!product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...product,
        mdxDescription: await serialize(product.description),
      },
    },
  };
};

export default Course;
