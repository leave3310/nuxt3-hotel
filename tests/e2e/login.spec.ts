import { expect, test } from "@nuxt/test-utils/playwright";

test.describe("登入頁", () => {
  test.beforeEach(async ({ goto }) => {
    await goto(`${process.env.NUXT_PUBLIC_APP_URL}login`, { waitUntil: "hydration" });
  });

  test("登入成功", async ({ page }) => {
    await page.getByTestId("email-input").fill(process.env.NUXT_LOGIN_ACCOUNT ?? "a@gmail.com");
    await page.getByTestId("password-input").fill(process.env.NUXT_LOGIN_PASSWORD ?? "123456");

    await Promise.all([
      page.keyboard.down("Enter"),
      page.waitForURL(process.env.NUXT_PUBLIC_APP_URL ?? "http://localhost:3000"),

    ]);
    await expect(page).toHaveURL(process.env.NUXT_PUBLIC_APP_URL ?? "http://localhost:3000");
    // await expect(page.getByTestId("home-page-header")).toBeVisible();
  });

  test("當密碼少於8碼時會跳錯誤訊息框", async ({ page }) => {
    await page.getByTestId("email-input").fill("a@gmail.com");
    await page.getByTestId("password-input").fill("123456");
    await page.keyboard.down("Enter");

    await expect(page.locator("#swal2-html-container")).toBeVisible();
    await expect(page.locator("#swal2-html-container")).toHaveText("密碼需至少 8 碼以上");
  });
});
