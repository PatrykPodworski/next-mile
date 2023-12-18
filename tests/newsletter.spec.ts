import test, { expect } from "@playwright/test";
import { getBaseUrl } from "./helpers";

// TODO: Add pretty locators
test("can subscribe to newsletter", async ({ page }) => {
  const baseUrl = getBaseUrl();
  await page.goto(baseUrl);

  await page.click('[href="/contact"]');

  await page.fill('[name="email"]', "patryk3101+playwright@gmail.com");
  await page.getByRole("button", { name: "Submit" }).click();
  const heading = page.locator(".text-green-500");

  await expect(heading).toHaveText("Thank you for subscribing!");
});
