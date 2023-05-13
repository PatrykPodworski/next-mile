const loadEnv = require("./utils/loadEnv.ts");
loadEnv();

const graphqlConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  documents: ["graphql/**/*.graphql", "graphql/**/*.ts", "graphql/**/*.tsx"],
  extensions: {
    codegen: {
      generates: {
        "./graphql/generated/": {
          preset: "client",
        },
      },
    },
  },
};

module.exports = graphqlConfig;
