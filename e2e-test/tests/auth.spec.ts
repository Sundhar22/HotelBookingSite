import { expect, test } from "@playwright/test";
const FrontUrl: string = "http://localhost:5173/";

test("auth should allow to login user", async ({ page }) => {
  await page.goto(FrontUrl);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("test2@gmail.com");
  await page.locator("[name=password]").fill("test@gmail.com");

  await page.locator("[type=submit]").click();

  await expect(page.getByText("Successfully loggedIn")).toBeVisible();

  await expect(page.getByRole("link", { name: "MyBooking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "MyHotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
test("register should allow user to register", async ({ page }) => {
  await page.goto(FrontUrl);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Register here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();
  await page.locator("[name=confirmPassword]").fill("password");
  await page.locator("[name=password]").fill("password");
  await page.locator("[name=email]").fill(`testing${Math.floor(Math.random()*90000)+10000}@mg.com`);
  await page.locator("[name=lastName]").fill("s");
  await page.locator("[name=firstName]").fill("mohanasundharam");

  await page.locator("[type=submit]").click();

  await expect(page.getByText("Account created successfully")).toBeVisible();

  await expect(page.getByRole("link", { name: "MyBooking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "MyHotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
