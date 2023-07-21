import puppeteer from "puppeteer";
import sharp from "sharp";

export async function captureScreenshots(url) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url);

  const screenshots = [
    {
      mockupPath: "assets/phone2Mockup.png",
      viewportWidth: 358,
      viewportHeight: 636,
      top: 152,
      left: 321,
      filename: "phone2Mockup.png",
    },
    {
      mockupPath: "assets/laptopMockup.png",
      viewportWidth: 1104,
      viewportHeight: 690,
      top: 308,
      left: 408,
      filename: "laptopMockup.png",
    },
    {
      mockupPath: "assets/laptop2Mockup.png",
      viewportWidth: 1036,
      viewportHeight: 649,
      top: 245,
      left: 431,
      filename: "laptop2Mockup.png",
    },
    {
      mockupPath: "assets/desktopTorMockup.png",
      viewportWidth: 1104,
      viewportHeight: 690,
      top: 308,
      left: 408,
      filename: "desktopTorMockup.png",
    },
    {
      mockupPath: "assets/desktopMockup.png",
      viewportWidth: 1143,
      viewportHeight: 649,
      top: 218,
      left: 381,
      filename: "desktopMockup.png",
    },
    {
      mockupPath: "assets/tabletMockup.png",
      viewportWidth: 714,
      viewportHeight: 948,
      top: 270,
      left: 393,
      filename: "tabletMockup.png",
    },
    {
      mockupPath: "assets/tablet2Mockup.png",
      viewportWidth: 714,
      viewportHeight: 948,
      top: 270,
      left: 393,
      filename: "tablet2Mockup.png",
    },
    {
      mockupPath: "assets/tablet3Mockup.png",
      viewportWidth: 962,
      viewportHeight: 603,
      top: 212,
      left: 268,
      filename: "tablet3Mockup.png",
    },
  ];

  const images = [];

  for (const screenshot of screenshots) {
    await page.setViewport({
      width: screenshot.viewportWidth,
      height: screenshot.viewportHeight,
      deviceScaleFactor: 1,
    });

    const screenshotBuffer = await page.screenshot();

    const mockupBuffer = await sharp(screenshot.mockupPath).toBuffer();

    const finalImageBuffer = await sharp(mockupBuffer)
      .composite([
        {
          input: screenshotBuffer,
          top: screenshot.top,
          left: screenshot.left,
        },
      ])
      .toBuffer();

    images.push({
      filename: screenshot.filename,
      imageBuffer: finalImageBuffer,
    });
  }

  await browser.close();

  return images;

}