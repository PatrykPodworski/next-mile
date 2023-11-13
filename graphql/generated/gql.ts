/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CompleteOrder($stripeCheckoutId: String!) {\n  updateOrder(\n    where: {stripeCheckoutId: $stripeCheckoutId}\n    data: {orderStatus: Completed}\n  ) {\n    id\n  }\n}": types.CompleteOrderDocument,
    "mutation CreateOrder($email: String!, $total: Int!, $stripeCheckoutId: String!, $items: [OrderItemCreateInput!]) {\n  createOrder(\n    data: {email: $email, total: $total, stripeCheckoutId: $stripeCheckoutId, orderItems: {create: $items}}\n  ) {\n    id\n  }\n}": types.CreateOrderDocument,
    "query getCartProducts($ids: [ID!]!) {\n  products(where: {id_in: $ids}) {\n    ...CartProduct\n  }\n}\n\nfragment CartProduct on Product {\n  id\n  slug\n  name\n  price\n  description\n  images {\n    url\n  }\n}": types.GetCartProductsDocument,
    "query getProduct($slug: String!) {\n  product(where: {slug: $slug}) {\n    ...ProductDetails\n  }\n}\n\nfragment ProductDetails on Product {\n  slug\n  name\n  price\n  description\n  images(first: 1) {\n    url\n  }\n}": types.GetProductDocument,
    "query GetProducts($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...ProductListItem\n  }\n}\n\nfragment ProductListItem on Product {\n  id\n  slug\n  name\n  price\n  description\n  images(first: 1) {\n    url\n  }\n  categories(first: 1) {\n    name\n    id\n  }\n}": types.GetProductsDocument,
    "query GetProductsSlug {\n  products {\n    slug\n  }\n}": types.GetProductsSlugDocument,
    "mutation CreateProductReview($review: ReviewCreateInput!) {\n  createReview(data: $review) {\n    id\n  }\n}": types.CreateProductReviewDocument,
    "query GetProductReviews($slug: String!) {\n  reviews(where: {product: {slug: $slug}}) {\n    ...ProductReview\n  }\n}\n\nfragment ProductReview on Review {\n  id\n  name\n  content\n  headline\n  rating\n}": types.GetProductReviewsDocument,
    "mutation CreateUser($activationCode: String!, $email: String!, $password: String!, $name: String!) {\n  createAppUser(\n    data: {name: $name, email: $email, password: $password, activationCode: $activationCode}\n  ) {\n    id\n  }\n}": types.CreateUserDocument,
    "query GetUserByEmail($email: String!) {\n  appUser(where: {email: $email}) {\n    ...User\n  }\n}\n\nfragment User on AppUser {\n  id\n  name\n  email\n  password\n}": types.GetUserByEmailDocument,
    "mutation PublishUser($activationCode: String!) {\n  publishAppUser(where: {activationCode: $activationCode}) {\n    id\n  }\n}": types.PublishUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CompleteOrder($stripeCheckoutId: String!) {\n  updateOrder(\n    where: {stripeCheckoutId: $stripeCheckoutId}\n    data: {orderStatus: Completed}\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation CompleteOrder($stripeCheckoutId: String!) {\n  updateOrder(\n    where: {stripeCheckoutId: $stripeCheckoutId}\n    data: {orderStatus: Completed}\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateOrder($email: String!, $total: Int!, $stripeCheckoutId: String!, $items: [OrderItemCreateInput!]) {\n  createOrder(\n    data: {email: $email, total: $total, stripeCheckoutId: $stripeCheckoutId, orderItems: {create: $items}}\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation CreateOrder($email: String!, $total: Int!, $stripeCheckoutId: String!, $items: [OrderItemCreateInput!]) {\n  createOrder(\n    data: {email: $email, total: $total, stripeCheckoutId: $stripeCheckoutId, orderItems: {create: $items}}\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getCartProducts($ids: [ID!]!) {\n  products(where: {id_in: $ids}) {\n    ...CartProduct\n  }\n}\n\nfragment CartProduct on Product {\n  id\n  slug\n  name\n  price\n  description\n  images {\n    url\n  }\n}"): (typeof documents)["query getCartProducts($ids: [ID!]!) {\n  products(where: {id_in: $ids}) {\n    ...CartProduct\n  }\n}\n\nfragment CartProduct on Product {\n  id\n  slug\n  name\n  price\n  description\n  images {\n    url\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getProduct($slug: String!) {\n  product(where: {slug: $slug}) {\n    ...ProductDetails\n  }\n}\n\nfragment ProductDetails on Product {\n  slug\n  name\n  price\n  description\n  images(first: 1) {\n    url\n  }\n}"): (typeof documents)["query getProduct($slug: String!) {\n  product(where: {slug: $slug}) {\n    ...ProductDetails\n  }\n}\n\nfragment ProductDetails on Product {\n  slug\n  name\n  price\n  description\n  images(first: 1) {\n    url\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...ProductListItem\n  }\n}\n\nfragment ProductListItem on Product {\n  id\n  slug\n  name\n  price\n  description\n  images(first: 1) {\n    url\n  }\n  categories(first: 1) {\n    name\n    id\n  }\n}"): (typeof documents)["query GetProducts($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...ProductListItem\n  }\n}\n\nfragment ProductListItem on Product {\n  id\n  slug\n  name\n  price\n  description\n  images(first: 1) {\n    url\n  }\n  categories(first: 1) {\n    name\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductsSlug {\n  products {\n    slug\n  }\n}"): (typeof documents)["query GetProductsSlug {\n  products {\n    slug\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateProductReview($review: ReviewCreateInput!) {\n  createReview(data: $review) {\n    id\n  }\n}"): (typeof documents)["mutation CreateProductReview($review: ReviewCreateInput!) {\n  createReview(data: $review) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductReviews($slug: String!) {\n  reviews(where: {product: {slug: $slug}}) {\n    ...ProductReview\n  }\n}\n\nfragment ProductReview on Review {\n  id\n  name\n  content\n  headline\n  rating\n}"): (typeof documents)["query GetProductReviews($slug: String!) {\n  reviews(where: {product: {slug: $slug}}) {\n    ...ProductReview\n  }\n}\n\nfragment ProductReview on Review {\n  id\n  name\n  content\n  headline\n  rating\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateUser($activationCode: String!, $email: String!, $password: String!, $name: String!) {\n  createAppUser(\n    data: {name: $name, email: $email, password: $password, activationCode: $activationCode}\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation CreateUser($activationCode: String!, $email: String!, $password: String!, $name: String!) {\n  createAppUser(\n    data: {name: $name, email: $email, password: $password, activationCode: $activationCode}\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserByEmail($email: String!) {\n  appUser(where: {email: $email}) {\n    ...User\n  }\n}\n\nfragment User on AppUser {\n  id\n  name\n  email\n  password\n}"): (typeof documents)["query GetUserByEmail($email: String!) {\n  appUser(where: {email: $email}) {\n    ...User\n  }\n}\n\nfragment User on AppUser {\n  id\n  name\n  email\n  password\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation PublishUser($activationCode: String!) {\n  publishAppUser(where: {activationCode: $activationCode}) {\n    id\n  }\n}"): (typeof documents)["mutation PublishUser($activationCode: String!) {\n  publishAppUser(where: {activationCode: $activationCode}) {\n    id\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;