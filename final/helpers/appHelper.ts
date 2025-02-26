import  { expect, Frame } from '@playwright/test';
import { getFrameLocator } from './frameHelper.js';

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