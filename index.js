import puppeteer from "puppeteer";

async function captureScreenshot() {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  
  await page.setViewport({
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
  });

  await page.goto('https://recursos-web-ten.vercel.app/');
  await page.screenshot({path: 'examplee.png'});
  await browser.close();
}

captureScreenshot();