import test, { expect } from "playwright/test";

const UI_URL: string = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("test2@gmail.com");
  await page.locator("[name=password]").fill("test@gmail.com");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Successfully loggedIn")).toBeVisible();
});

test("hotel should be displayed after text",async({page})=>{

    await page.goto(UI_URL);
    await page.locator("[name=destination]").fill("Test city")
    await page.locator("[name=Search]").click()
    await expect(page.getByText("1 Hotels found in Test city")).toBeVisible()
    await expect(page.getByText("Test Hotel 2")).toBeVisible()
    
})
