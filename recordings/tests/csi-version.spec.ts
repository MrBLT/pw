import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mingle-portal.inforcloudsuite.com/v2/SLSGDENA209_AX1/5e29a9ce-6356-4b64-a59b-207c7fb1b5c7');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('ElevateD1RF_00');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SUNConf@dminD1RF');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.locator('iframe[name="syteline_44_5e29a9ce-6356-4b64-a59b-207c7fb1b5c7"]').contentFrame().locator('#configCombo-trigger-picker').click();
  await page.locator('iframe[name="syteline_44_5e29a9ce-6356-4b64-a59b-207c7fb1b5c7"]').contentFrame().getByRole('option', { name: 'SLSGDENA209_AX1_DALS' }).click();
  await page.locator('iframe[name="syteline_44_5e29a9ce-6356-4b64-a59b-207c7fb1b5c7"]').contentFrame().getByRole('button', { name: 'Sign In' }).click();
  await page.locator('iframe[name="syteline_44_5e29a9ce-6356-4b64-a59b-207c7fb1b5c7"]').contentFrame().locator('#mgtoolbarbutton-1096-btnEl').getByRole('button', { name: 'Help' }).click();
  await page.locator('iframe[name="syteline_44_5e29a9ce-6356-4b64-a59b-207c7fb1b5c7"]').contentFrame().getByLabel('About', { exact: true }).getByRole('menuitem', { name: 'About' }).click();
  await expect(page.locator('iframe[name="syteline_44_5e29a9ce-6356-4b64-a59b-207c7fb1b5c7"]').contentFrame().locator('#box-1202')).toContainText('2025.02.03.7');
  await page.locator('iframe[name="syteline_44_5e29a9ce-6356-4b64-a59b-207c7fb1b5c7"]').contentFrame().getByRole('button', { name: 'OK' }).click();
  await page.locator('#osp-nav-user-profile').click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
  await page.goto('https://mingle-portal.inforcloudsuite.com/session/slo/signoutsuccess?tenantId=SLSGDENA209_AX1');
});