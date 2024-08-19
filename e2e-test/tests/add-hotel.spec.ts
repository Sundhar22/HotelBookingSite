import test, { expect } from "playwright/test";

import path from "path";

const UI_URL: string = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("test2@gmail.com");
  await page.locator("[name=password]").fill("test@gmail.com");

  await page.locator("[type=submit]").click();

  await expect(page.getByText("Successfully loggedIn")).toBeVisible();
});

test("add new hotels to the  server!", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await expect(page.getByText("Add Hotel")).toBeVisible();

  await page.locator("[name=name]").fill("Test Hotel");
  await page.locator("[name=city]").fill("Test city");
  await page.locator("[name=country]").fill("Test country");
  await page
    .locator("[name=description]")
    .fill("Test description of the hotel");
  await page.locator("[name=pricePer24h]").fill("100");
  await page.selectOption("select[name=starRating]", "5");

  await page.getByText("Eco-Hotel").click();
  await page.getByLabel("Free Wi-Fi").check();
  await page.getByLabel("Bar/Lounge").check();

  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=children]").fill("1");

  await page.setInputFiles("[name=imageFiles]", [
    path.join(__dirname, "files", "1.png"),
    path.join(__dirname, "files", "2.png"),
  ]);
  await page.getByRole("button", { name: "save" }).click();

  await expect(page.getByText("Hotel added successfully")).toBeVisible({
    timeout: 10000,
  });
});

test("check the added hotel in the my hotels page", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await expect(page.getByText("Add Hotel")).toBeVisible();

  await expect(page.getByText("Test Hotel")).toBeVisible();

  await expect(page.getByText("Test description of the hotel")).toBeVisible();
  await expect(page.getByText(" City: Test city Country: Test country Adults: 2 Children: 1 Price: 100 Rating: 5")).toBeVisible();
});
