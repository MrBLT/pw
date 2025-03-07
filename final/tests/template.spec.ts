import { test, expect, request } from '@playwright/test';
import { getFrameLocator } from '../helpers/frameHelper.ts';
import { loginAndConfigure, operatorSignin } from '../helpers/appHelper.ts';

// Make a copy of this template to remove the need to record steps to login to CSI
// To start recording steps, first go into test explorer and run your copy of this template
// Once the script has finished, place the cursor at the comment below and then in the
// playwright tools in VSCode, click 'Record at cursor'

test('test', async ({ page, request }) => {
  // login from helpers/appHelper.ts
  const iFrameVal = await loginAndConfigure(page);

  /*remove this comment and place cursor on this line*/

  //await logout(page);
});