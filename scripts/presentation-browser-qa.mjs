import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium } from 'file:///C:/Users/Bassam/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { createDefaultLearnerState } from '../lib/learner-state.ts';
const browser = await chromium.launch({
  headless: true,
  executablePath:
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
});
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const base = process.env.QA_URL ?? 'http://localhost:3010';
  if (process.env.QA_OFFLINE === 'true')
    await page.route('**/*', (route) =>
      new URL(route.request().url()).origin === new URL(base).origin
        ? route.continue()
        : route.abort(),
    );
  await page.addInitScript(
    (state) => {
      localStorage.setItem('pl300-simulator-state', JSON.stringify(state));
    },
    {
      ...createDefaultLearnerState(),
      learner: { name: 'QA Review', updatedAt: new Date().toISOString() },
    },
  );
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Got it', exact: true }).click();
  await page
    .getByRole('button', { name: 'Practice all 494', exact: true })
    .click();
  await page.getByRole('button', { name: 'Start now', exact: true }).click();
  await page.evaluate(() => document.fonts.ready);
  assert.match(
    await page
      .locator('body')
      .evaluate((el) => getComputedStyle(el).fontFamily),
    /Cairo/,
  );
  assert.equal(
    await page.evaluate(() =>
      Array.from(document.fonts).some(
        (f) => f.family === 'Cairo' && f.status === 'loaded',
      ),
    ),
    true,
  );
  await page.getByRole('button', { name: 'Question 178', exact: true }).click();
  await page.locator('select').first().selectOption({ label: 'role-playing' });
  await page
    .locator('select')
    .nth(1)
    .selectOption({ label: 'filter FactOrderDetails on OrderDate' });
  await page.screenshot({ path: '.openai/dropdown-178.png', fullPage: true });
  assert.equal(await page.locator('select').count(), 2);
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('pl300-simulator-state')),
  );
  assert.deepEqual(saved.studyProgress['f1-178-177'].answer.length, 2);
  const selected=await page.locator('select').evaluateAll(elements=>elements.map(e=>e.value));
  await page.getByRole('button',{name:'Return home and end the current session',exact:true}).first().click();
  await page.waitForTimeout(750);
  await page.getByRole('button',{name:'Practice all 494',exact:true}).click();
  await page.getByRole('button',{name:'Start now',exact:true}).click();
  await page.waitForTimeout(250);
  await page.screenshot({path:'.openai/practice-restart.png',fullPage:true});
  await page.getByRole('button',{name:/^Question 178(?:,|$)/}).click();
  assert.deepEqual(await page.locator('select').evaluateAll(elements=>elements.map(e=>e.value)),selected);
  await page.getByRole('button', { name: 'Question 355', exact: true }).click();
  assert.equal(await page.getByText('Statement 1', { exact: true }).count(), 0);
  await page.screenshot({ path: '.openai/statements-355.png', fullPage: true });
  await page.getByRole('button', { name: 'Question 342', exact: true }).click();
  assert.ok(
    await page.getByRole('region', { name: 'Case study', exact: true }).count(),
  );
  await page
    .getByRole('button', { name: 'Collapse context', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Read full context', exact: true })
    .click();
  await page.screenshot({ path: '.openai/case-study-342.png', fullPage: true });
  await page.getByText('Case tables and schemas (8) — open to inspect',{exact:true}).click();
  assert.equal(await page.locator('img[src*="case-northwind-"]').count(),8);
  assert.equal(await page.getByText('Order Details',{exact:true}).count(),1);
  await page.getByRole('button', { name: 'Question 59', exact: true }).click();
  assert.ok(
    await page.getByRole('cell', { name: 'CustomerID', exact: true }).count(),
  );
  await page.screenshot({ path: '.openai/table-59.png', fullPage: true });
  await page.getByRole('button', { name: 'Question 415', exact: true }).click();
  assert.equal(await page.locator('select').count(), 0);
  assert.ok(
    await page
      .getByText('Incomplete source — do not infer an answer', { exact: true })
      .count(),
  );
  await fs.mkdir('.openai', { recursive: true });
  await page.screenshot({ path: '.openai/home-review.png', fullPage: true });
  await page.getByRole('button', { name: 'Question 52', exact: true }).click();
  await page
    .getByRole('button', { name: 'Zoom / original size', exact: true })
    .first()
    .click();
  assert.ok(await page.getByRole('dialog').count());
  await page.keyboard.press('Escape');
  await page
    .getByRole('button', {
      name: 'Open AI tutor for the current question',
      exact: true,
    })
    .click();
  await page
    .getByRole('button', {
      name: 'Use built-in guidance (works offline)',
      exact: true,
    })
    .click();
  await page
    .getByRole('textbox', { name: 'Message the AI tutor', exact: true })
    .fill('Explain this question');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await page
    .getByText('This is built-in guidance, not a live AI response.', {
      exact: false,
    })
    .waitFor();
  await page.keyboard.press('Escape');
  await page.waitForTimeout(350);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(200);
  await page.screenshot({
    path: '.openai/mobile-presentation.png',
    fullPage: true,
  });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
    true,
  );
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify({
      status: 'PASS',
      base,
      offline: process.env.QA_OFFLINE === 'true',
      checks: [
        'local Cairo font loaded',
        'native dropdowns',
        'stable-ID progress saved',
        'typed table',
        'incomplete item blocked',
        'native exhibit zoom',
        'offline built-in tutor',
        'mobile no horizontal overflow',
        'no page errors',
      ],
    }),
  );
} finally {
  await browser.close();
}
