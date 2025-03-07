import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { loginAndConfigure, logout } from '../helpers/appHelper.ts';

// this could be replaced with an api call to an random name generator
// see csi-customer-v2.spec.ts for a simple example
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

test('update contact field cust master', async ({ page }) => {

  // login from helpers/appHelper.ts
  const iFrameVal = await loginAndConfigure(page);

  await page.locator(iFrameVal).contentFrame().getByLabel('Open').getByRole('button', { name: 'Open' }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('dialog', { name: 'Select Form' }).getByLabel('', { exact: true }).fill('customers');
  await page.locator(iFrameVal).contentFrame().getByRole('dialog', { name: 'Select Form' }).getByLabel('', { exact: true }).press('Tab');
  await page.locator(iFrameVal).contentFrame().getByText('Customers.gen2', { exact: true }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('button', { name: 'OK' }).click();

  /* 
    In the rare case where searching for a form returns results with multiple captions identical
    to the form name you wish to use; 'Customers' is a good example. Replace the 'Customers.gen2'
    getByText() line above with the following, replacing 'Customers' for the form you wish to use
  
    //search for 'Customers' will return multiple rows with the word Customer
    await page.locator(iFrameVal).contentFrame().getByText('Customers', { exact: true }).click();
    // this will sort form names ascending
    await page.locator(iFrameVal).contentFrame().getByLabel('Select Form').getByText('Name').click();
    // this will select the first form in the sorted list
    await page.locator(iFrameVal).contentFrame().getByText('Customers', { exact: true }).first().click();
  */

  await page.locator(iFrameVal).contentFrame().getByLabel('Open').press('Escape');
  await page.locator(iFrameVal).contentFrame().getByRole('button', { name: 'FiP' }).click();

  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).fill('3');
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Search Customers:' }).press('Enter');
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Order Contact:' }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Order Contact:' }).fill(randomName());
  await page.locator(iFrameVal).contentFrame().getByRole('textbox', { name: 'Order Contact:' }).press('Tab');

  if(await page.locator(iFrameVal).contentFrame().getByLabel('Save', { exact: true }).isEnabled() == true)
  {
    await page.locator(iFrameVal).contentFrame().getByLabel('Save', { exact: true }).getByRole('button', { name: 'Save' }).click();
  } else {
    throw new Error('Save button not Enabled!');
  }

  await logout(page);
});