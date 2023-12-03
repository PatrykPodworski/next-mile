import { test, expect } from "@playwright/test";

test("can buy product", async ({ page }) => {
  test.setTimeout(240000);
  const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL;
  if (!baseUrl) {
    throw new Error("PLAYWRIGHT_TEST_BASE_URL is missing");
  }

  await page.goto(baseUrl);

  await page.click('[href="/courses/page/1"]');
  await page.click('[data-testid="addToCartIconButton"]');
  await page.click('[href="/cart"]');
  await page.click('[href="/checkout"]');

  await page.fill('[name="emailAddress"]', "patryk3101+playwright@gmail.com");
  await page.fill('[name="name"]', "Patryk Playwright");
  await page.fill('[name="address"]', "Playwright Street 1");
  await page.fill('[name="phone"]', "123456789");
  await page.click('[data-testid="checkout-submit"]');

  await page.fill('[id="email"]', "patryk3101+playwright@gmail.com");
  await page.fill('[id="cardNumber"]', "4242424242424242");
  await page.fill('[id="cardExpiry"]', "1025");
  await page.fill('[id="cardCvc"]', "123");
  await page.fill('[id="billingName"]', "Patryk Playwright");
  await page.click('[data-testid="hosted-payment-submit-button"]');

  await page.waitForURL(
    (url) => {
      console.log(url.href, "vs", `${baseUrl}/orders/success`);
      return url.href.startsWith(`${baseUrl}/orders/success`);
    },
    { timeout: 120000 }
  );

  const heading = page.locator("h1");
  await expect(heading).toHaveText("Success!");
});
