import { test, expect } from '@playwright/test';
import { getFrameLocator } from '../helpers/frameHelper.ts';
import { operatorSignin } from '../helpers/appHelper.ts';

test('test', async ({ page }) => {

  // login from helpers/appHelper.ts
  await operatorSignin(page);

  // wait for nav bar to render so that we are sure iframes have been built
  await expect(page.getByRole('button', { name: 'Application Launcher' })).toBeVisible();

  // retrieve syteline iframe name
  const frameName = await getFrameLocator(page);
  const iFrameVal = 'iframe[name="' + frameName + '"]';

  await page.locator(iFrameVal).contentFrame().locator('#configCombo-trigger-picker').click();
  await page.locator(iFrameVal).contentFrame().getByRole('option', { name: `${process.env.SITE_CONFIG}` }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('button', { name: 'Sign In' }).click();
  await page.locator(iFrameVal).contentFrame().locator('#mgtoolbarbutton-1096-btnEl').getByRole('button', { name: 'Help' }).click();
  await page.locator(iFrameVal).contentFrame().getByLabel('About', { exact: true }).getByRole('menuitem', { name: 'About' }).click();
  await expect(page.locator(iFrameVal).contentFrame().locator('#box-1202')).toContainText(`${process.env.TARGET_VERSION}`);
  await page.locator(iFrameVal).contentFrame().getByRole('button', { name: 'OK' }).click();
  await page.locator('#osp-nav-user-profile').click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
  await page.goto('https://' + process.env.WEB_URL + '/session/slo/signoutsuccess?tenantId=' + process.env.TENANT);
});