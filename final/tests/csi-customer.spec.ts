import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { getFrameLocator } from '../helpers/frameHelper.ts';
import { operatorSignin } from '../helpers/appHelper.ts';

export function randomName() {
  const firstName = [
    "Steve",
    "Gary",
    "John",
    "Frank"
  ]

  const lastName = [
    "Smith",
    "Yellow",
    "Pink",
    "White",
  ]

  return firstName[faker.number.int({ min: 0, max: firstName.length - 1 })] + " " + lastName[faker.number.int({ min: 0, max: lastName.length - 1 })]
}

test('test', async ({ page }) => {

  // login from helpers/appHelper.ts
  await operatorSignin(page);

  // wait for nav bar to render so that we are sure iframes have been built
  await expect(page.getByRole('button', { name: 'Application Launcher' })).toBeVisible();

  // retrieve syteline iframe name
  const frameName = await getFrameLocator(page);
  const iFrameVal = 'iframe[name="' + frameName + '"]';

  await page.locator(iFrameVal).contentFrame().getByLabel('Open').getByRole('button', { name: 'Open' }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('dialog', { name: 'Select Form' }).getByLabel('', { exact: true }).fill('customers');
  await page.locator(iFrameVal).contentFrame().getByRole('dialog', { name: 'Select Form' }).getByLabel('', { exact: true }).press('Tab');
  await page.locator(iFrameVal).contentFrame().getByText('Customers.gen2', { exact: true }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('button', { name: 'OK' }).click();

  await page.locator(iFrameVal).contentFrame().getByLabel('Open').press('Escape');
  await page.locator(iFrameVal).contentFrame().getByRole('button', { name: 'FiP' }).click();

  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).fill('3');
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).press('Tab');
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).fill('3');
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).press('Enter');
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).fill('1');
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).press('Enter');
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).fill('3');
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).press('Enter');
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Order Contact:' }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Order Contact:' }).fill(randomName());
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Order Contact:' }).press('Tab');
  await page.locator(iFrameVal).contentFrame().getByLabel('Save', { exact: true }).getByRole('button', { name: 'Save' }).click();
  await page.locator('#osp-nav-user-profile').click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
  await page.goto('https://mingle-portal.inforcloudsuite.com/session/slo/signoutsuccess?tenantId=SLSGDENA209_AX1');

});