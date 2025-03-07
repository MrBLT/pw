import { test, expect, request, APIRequestContext } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { loginAndConfigure, logout } from '../helpers/appHelper.ts';

// Another option is https://randommer.io, which provides randomization for
// multiple categories
export async function randomName() {
  const req: APIRequestContext = await request.newContext();

  const response = await req.get('https://randomuser.me/api/?results=1&inc=name');
  const responseBody = JSON.parse(await response.text())
  
  return responseBody.results[0].name.first + ' ' + responseBody.results[0].name.last;
}

test('update contact field cust master', async ({ page, request }) => {

  // login from helpers/appHelper.ts
  const iFrameVal = await loginAndConfigure(page);

  await page.locator(iFrameVal).contentFrame().getByLabel('Open').getByRole('button', { name: 'Open' }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('dialog', { name: 'Select Form' }).getByLabel('', { exact: true }).fill('customers');
  await page.locator(iFrameVal).contentFrame().getByRole('dialog', { name: 'Select Form' }).getByLabel('', { exact: true }).press('Tab');
  await page.locator(iFrameVal).contentFrame().getByText('Customers.gen2', { exact: true }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('button', { name: 'OK' }).click();

  await page.locator(iFrameVal).contentFrame().getByLabel('Open').press('Escape');
  await page.locator(iFrameVal).contentFrame().getByRole('button', { name: 'FiP' }).click();

  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).fill('3');
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).press('Enter');
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Order Contact:' }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Order Contact:' }).fill(await randomName());
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Order Contact:' }).press('Tab');

  if(await page.locator(iFrameVal).contentFrame().getByLabel('Save', { exact: true }).isEnabled() == true)
  {
    await page.locator(iFrameVal).contentFrame().getByLabel('Save', { exact: true }).getByRole('button', { name: 'Save' }).click();
  } else {
    throw new Error('Save button not Enabled!');
  }

  await logout(page);
});