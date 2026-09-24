import { expect, test, type Page } from '@playwright/test';

// Assertions derive from the rendered data attributes, not hard-coded counts,
// so adding or expiring job files doesn't break the suite.

const cards = (page: Page) => page.locator('[data-job]');
const visibleCards = (page: Page) => page.locator('[data-job]:visible');

async function visibleAttr(page: Page, attr: string): Promise<string[]> {
  return visibleCards(page).evaluateAll((els, a) => els.map((el) => el.getAttribute(a) ?? ''), attr);
}

test.beforeEach(async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#job-filters')).toBeVisible();
});

test('lists every open job with salary and closing date', async ({ page }) => {
  const total = await cards(page).count();
  expect(total).toBeGreaterThan(0);
  await expect(visibleCards(page)).toHaveCount(total);
  await expect(page.locator('#job-count')).toHaveText(`${total} open ${total === 1 ? 'role' : 'roles'}`);
  await expect(cards(page).first()).toContainText(/\$[\d,]+/);
  await expect(cards(page).first()).toContainText(/\d{2}\/\d{2}\/\d{4}/);
});

test('filters by work type', async ({ page }) => {
  const total = await cards(page).count();
  await page.getByLabel('Work type').selectOption('hybrid');

  const types = await visibleAttr(page, 'data-work-type');
  expect(types.length).toBeGreaterThan(0);
  expect(types.length).toBeLessThan(total);
  expect(new Set(types)).toEqual(new Set(['hybrid']));
  await expect(page).toHaveURL(/workType=hybrid/);
});

test('filters by location', async ({ page }) => {
  const location = page.getByLabel('Location');
  const value = await location.locator('option').nth(1).getAttribute('value');
  await location.selectOption(value!);

  const locations = await visibleAttr(page, 'data-location');
  expect(locations.length).toBeGreaterThan(0);
  expect(new Set(locations)).toEqual(new Set([value]));
});

test('combined filters with no match show empty state, clear restores all', async ({ page }) => {
  const total = await cards(page).count();
  const pairs = await cards(page).evaluateAll((els) =>
    els.map((el) => `${el.getAttribute('data-location')}|${el.getAttribute('data-work-type')}`),
  );
  const locations = await page
    .getByLabel('Location')
    .locator('option:not([value=""])')
    .evaluateAll((els) => els.map((el) => el.getAttribute('value')!));
  const unmatched = locations
    .flatMap((loc) => ['remote', 'hybrid', 'onsite'].map((type) => [loc, type]))
    .find(([loc, type]) => !pairs.includes(`${loc}|${type}`));
  test.skip(!unmatched, 'every location/work type combination has a job');

  await page.goto(`./?location=${unmatched![0]}&workType=${unmatched![1]}`);

  await expect(visibleCards(page)).toHaveCount(0);
  await expect(page.locator('#no-results')).toBeVisible();

  await page.locator('#clear-filters').click();
  await expect(visibleCards(page)).toHaveCount(total);
  await expect(page).not.toHaveURL(/\?/);
});

test('job card links to its detail page', async ({ page }) => {
  const first = cards(page).first();
  const title = (await first.locator('h2').innerText()).trim();
  await first.locator('a').click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
});
