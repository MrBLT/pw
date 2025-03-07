import { test, expect } from '@playwright/test';
import { loginAndConfigure, logout } from '../helpers/appHelper.ts';

var iFrameVal = '';

test.describe(() => {
  // All tests in this describe group will get 2 retry attempts.
  test.describe.configure({ retries: 2 });

  test('Validate SyteLine Version', async ({ page }) => {

    // login from helpers/appHelper.ts
    iFrameVal = await loginAndConfigure(page);

    //open about popup
    await page.locator(iFrameVal).contentFrame().locator('#mgtoolbarbutton-1096-btnEl').getByRole('button', { name: 'Help' }).click();
    //await page.waitForTimeout(3000); //need to pause a few seconds for the menu to appear
    await page.locator(iFrameVal).contentFrame().getByLabel('About', { exact: true }).getByRole('menuitem', { name: 'About' }).click();

    //look in text body and validate version
    await expect(page.locator(iFrameVal).contentFrame().locator('#modalDlg-body')).toContainText(`${process.env.TARGET_VERSION}`);

    //close popup
    await page.locator(iFrameVal).contentFrame().getByRole('button', { name: 'OK' }).click();

    await logout(page);
  });
});
