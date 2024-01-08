export const getBaseUrl = () => {
  const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL;
  if (!baseUrl) {
    throw new Error("PLAYWRIGHT_TEST_BASE_URL is missing");
  }
  return baseUrl;
};
