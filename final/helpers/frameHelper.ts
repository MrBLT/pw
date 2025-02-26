import { Frame, Page } from '@playwright/test';

export async function getFrameLocator(page: Page, value?):Promise<Frame> {
  if(value == undefined) {
    value = "syteline"
  }
  await page.waitForTimeout(5000)
  const frames = await page.frames();
  let frame:any = null
  for (let j = 0; j < frames.length; j++) {
    const frameName =  frames[j].name();
    if ( frameName.includes(value)) {
      frame =  frames[j]
    }
  }
  if (frame != null) {
    return frame.name()
  } else {
    throw  new Error("Frame not found with starting with " + value);
  }
}
