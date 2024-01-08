import test, { expect } from "@playwright/test";
import { getBaseUrl } from "./helpers";

test("can subscribe to newsletter", async ({ page }) => {
  const baseUrl = getBaseUrl();
  await page.goto(baseUrl);

  await page.click('[href="/contact"]');

  await page.fill('[name="emailAddress"]', "patryk3101+playwright@gmail.com");
  await page.click('[data-testid="newsletter-submit"]');
  const heading = page.locator('[data-testid="newsletter-success"]');

  await expect(heading).toHaveText("Thank you for subscribing!");
});
