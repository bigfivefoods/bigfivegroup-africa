import { test, expect } from "@playwright/test";

test.describe("Big Five Group smoke", () => {
  test("home loads who-we-serve and contact CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/One Group/i).first()).toBeVisible();
    await expect(page.getByText(/Outcomes first/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Book a briefing/i }).first()).toBeVisible();
  });

  test("contact API returns mailto for a valid enquiry", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "Test Partner",
        email: "partner@example.com",
        interest: "foods",
        message: "We need a school nutrition briefing for Q3 planning.",
        website: "",
      },
    });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.mailto).toContain("mailto:craig@bigfivegroup.africa");
  });

  test("contact page renders form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: /Tell us the outcome/i })).toBeVisible();
    await expect(page.getByLabel(/Name/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Send enquiry/i })).toBeVisible();
  });

  test("foods case study and NSNP link", async ({ page }) => {
    await page.goto("/foods#case-study");
    await expect(page.getByText(/2\.5 million/i).first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: /National School Nutrition Programme|Official DBE|DBE/i }).first()
    ).toBeVisible();
  });

  test("leadership deck and FMCG case study", async ({ page }) => {
    await page.goto("/leadership");
    await expect(page.locator("#leadership-deck")).toBeVisible();
    await page.goto("/leadership#case-study");
    await expect(page.getByText(/African FMCG/i).first()).toBeVisible();
    await expect(page.getByText(/\+45\.1%|45\.1%/i).first()).toBeVisible();
    await expect(page.getByText(/Principles/i).first()).toBeVisible();
  });

  test("newsletter page and subscribe API with consent", async ({ page, request }) => {
    await page.goto("/newsletter");
    await expect(page.getByRole("heading", { name: /Stay close to the work/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Subscribe/i }).first()).toBeVisible();

    const res = await request.post("/api/newsletter/subscribe", {
      data: {
        email: `e2e-${Date.now()}@example.com`,
        name: "E2E Subscriber",
        consent: true,
        source: "e2e_smoke",
        website: "",
        topics: ["programmes", "milestones"],
      },
    });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(["active", "pending"]).toContain(body.status);

    const noConsent = await request.post("/api/newsletter/subscribe", {
      data: {
        email: "noconsent@example.com",
        consent: false,
        website: "",
      },
    });
    expect(noConsent.status()).toBe(400);
  });
});
