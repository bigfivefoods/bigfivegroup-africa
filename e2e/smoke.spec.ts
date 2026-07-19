import { test, expect } from "@playwright/test";

test.describe("Big Five Group smoke", () => {
  test("home loads who-we-serve and contact CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /One Group/i })).toBeVisible();
    await expect(page.getByText(/Outcomes first/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Book a briefing/i }).first()).toBeVisible();
  });

  test("contact form validates and API accepts", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: /Tell us the outcome/i })).toBeVisible();

    await page.getByLabel(/Name/i).fill("Test Partner");
    await page.getByLabel(/^Email/i).fill("partner@example.com");
    await page.getByLabel(/How can we help/i).fill("We need a school nutrition briefing for Q3.");
    await page.getByRole("button", { name: /Send enquiry/i }).click();

    // Success UI or thank-you redirect (depends on RESEND)
    await expect(
      page.getByText(/Enquiry ready|Thank you|Enquiry sent/i).first()
    ).toBeVisible({ timeout: 15_000 });
  });

  test("foods case study and NSNP link", async ({ page }) => {
    await page.goto("/foods#case-study");
    await expect(page.getByText(/2\.5 million/i).first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: /National School Nutrition Programme|Official DBE/i }).first()
    ).toBeVisible();
  });

  test("leadership deck section exists", async ({ page }) => {
    await page.goto("/leadership");
    await expect(page.getByText(/Super-Cube/i).first()).toBeVisible();
    await expect(page.locator("#leadership-deck")).toBeVisible();
  });
});
