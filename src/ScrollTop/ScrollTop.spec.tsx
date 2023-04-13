import { expect, test } from "@playwright/test";

// スクロール処理が早すぎるので間にスリープ処理を入れる
const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

test("初回ロード時はScrollTopが非表示になっていること", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/iframe.html?args=&id=scrolltop--default&viewMode=story"
  );

  await expect(
    page.getByRole("button", { name: "ページ上部に戻る" })
  ).not.toBeInViewport();
});

test("下へスクロールした後に上にスクロールすると、ScrollTopが表示されること", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:6006/iframe.html?args=&id=scrolltop--default&viewMode=story"
  );

  await page.evaluate(() => window.scrollTo(0, 2000));
  await sleep(100);
  await page.evaluate(() => window.scrollTo(0, 1000));

  await expect(
    page.getByRole("button", { name: "ページ上部に戻る" })
  ).toBeInViewport();
});

test("ScrollTopが表示された状態で下へスクロールすると、ScrollTopが非表示になること", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:6006/iframe.html?args=&id=scrolltop--default&viewMode=story"
  );

  await page.evaluate(() => window.scrollTo(0, 2000));
  await sleep(100);
  await page.evaluate(() => window.scrollTo(0, 1000));
  await sleep(100);
  await page.evaluate(() => window.scrollTo(0, 2000));

  await expect(
    page.getByRole("button", { name: "ページ上部に戻る" })
  ).not.toBeInViewport();
});

test("ScrollTopが表示された状態で一番上までスクロールすると、ScrollTopが非表示になること", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:6006/iframe.html?args=&id=scrolltop--default&viewMode=story"
  );

  await page.evaluate(() => window.scrollTo(0, 2000));
  await sleep(100);
  await page.evaluate(() => window.scrollTo(0, 1000));
  await sleep(100);
  await page.evaluate(() => window.scrollTo(0, 0));

  await expect(
    page.getByRole("button", { name: "ページ上部に戻る" })
  ).not.toBeInViewport();
});

test("ScrollTopをクリックすると、一番上にスクロールされて、ScrollTopが非表示になること", async ({
  page,
}) => {
  await page.goto(
    "http://localhost:6006/iframe.html?args=&id=scrolltop--default&viewMode=story"
  );

  await page.evaluate(() => window.scrollTo(0, 2000));
  await sleep(100);
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.getByRole("button", { name: "ページ上部に戻る" }).click();
  await sleep(1000);

  await expect(
    page.getByRole("button", { name: "ページ上部に戻る" })
  ).not.toBeInViewport();
  await expect(await page.evaluate(() => window.scrollY)).toBe(0);
});
