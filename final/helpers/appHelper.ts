import  { expect, Frame } from '@playwright/test';
import { getFrameLocator } from './frameHelper.js';

/**
 * These helpers are for logging into CloudSuite Industrial via Infor Portal SAAS using SSO.
 * On-premise installations will be different and will need to record steps for the login process
 * then replace below with what was recorded
 */

export async function operatorSignin(page: any): Promise<void> {
    await page.goto('https://' + process.env.WEB_URL + '/v2/' + process.env.TENANT + '/' + process.env.WEB_URL_GUID);
    await page.locator('body').click();
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill(`${process.env.USERNAME}`);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(`${process.env.PASSWORD}`);
    await page.getByRole('button', { name: 'Sign in' }).click();

    // capture any error messages
    const textContent = await page.getByRole('main').textContent();

    const failedLogin = 'Your username or password is no longer active.';
    if (textContent.includes(failedLogin)) {
        await page.screenshot({ path: 'login_failure.png', fullPage: true });
        throw new Error(failedLogin);
    }
}

export async function logout(page: any): Promise<void> {
  //logout
  await page.locator('#osp-nav-user-profile').click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
  await page.goto('https://' + process.env.WEB_URL + '/session/slo/signoutsuccess?tenantId=' + process.env.TENANT);

  //verify logout was successful
  await expect(page.locator('body')).toContainText('Logout Successful');
}

export async function loginAndConfigure(page: any): Promise<string> {
  //login to portal  
  await operatorSignin(page);

  // wait for nav bar to render so that we are sure iframes have been built
  await expect(page.locator('#osp-nav-launcher')).toBeVisible();

  // retrieve syteline iframe name
  const frameName = await getFrameLocator(page);
  const iFrameVal = 'iframe[name="' + frameName + '"]';

  //login to site config
  await page.locator(iFrameVal).contentFrame().locator('#configCombo-trigger-picker').click();
  await page.locator(iFrameVal).contentFrame().getByRole('option', { name: `${process.env.SITE_CONFIG}` }).click();
  await page.locator(iFrameVal).contentFrame().getByRole('button', { name: 'Sign In' }).click();

  //wait for syteline UI to load
  await expect(page.locator(iFrameVal).contentFrame().locator('#expandExplorer')).toBeVisible();

  //if explorer menu expanded, hide
  if(await page.locator(iFrameVal).contentFrame().locator('#explorerPanel_header').isVisible() == true)
  {  
    await page.locator(iFrameVal).contentFrame().locator('#expandExplorer').click();
  }

  //if menu items hidden, expand
  if(await page.locator(iFrameVal).contentFrame().getByRole('button', { name: '>>' }).isVisible() == true)
  {
    await page.locator(iFrameVal).contentFrame().getByRole('button', { name: '>>' }).click();

    //might need to click a second time to show all menu options
    if(await page.locator(iFrameVal).contentFrame().getByRole('button', { name: '>>' }).isVisible() == true)
    {
      await page.locator(iFrameVal).contentFrame().getByRole('button', { name: '>>' }).click();
    }
  }

  //need to pause a few seconds to ensure the html is fully rendered
  await page.waitForTimeout(5000);

  return iFrameVal;
}