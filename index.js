import fs from "fs";
import puppeteer from "puppeteer";
import sharp from "sharp";
import path from "path";

async function captureScreenshotTor() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  const viewportWidth = 1100;
  const viewportHeight = 870;

  await page.setViewport({
    width: viewportWidth,
    height: viewportHeight,
    deviceScaleFactor: 1,
  });

  await page.goto("https://recursos-web-ten.vercel.app/");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const screenshotBuffer = await page.screenshot();

  await browser.close();

  const sharpScreenshot = await sharp(screenshotBuffer)
    .affine([
      [1, 0.1],
      [0.01, 0.9],
    ], {
      background: 'transparent',
      interpolator: sharp.interpolators.nohalo
   })
    .toBuffer();

  const mockupBuffer = await sharp("assets/desktopTorMockup.png").toBuffer();

  const finalImageBuffer = await sharp(mockupBuffer)
    .composite([
      {
        input: sharpScreenshot,
        top: 500,
        left: 500,
      },
    ])
    .toBuffer();

  const carpeta = "imagenes/ima";
  const rutaCompleta = path.resolve(carpeta);

  if (!fs.existsSync(rutaCompleta)) {
    fs.mkdirSync(rutaCompleta, { recursive: true });
  }

  fs.writeFile(
    path.join(rutaCompleta, "imagen-final.png"),
    finalImageBuffer,
    (err) => {
      if (err) {
        console.error("Error al guardar la imagen final:", err);
        return;
      }
      console.log("Imagen final guardada exitosamente");
    }
  );
}

async function captureScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  const viewportWidth = 1104;
  const viewportHeight = 690;

  await page.setViewport({
    width: viewportWidth,
    height: viewportHeight,
    deviceScaleFactor: 1,
  });

  await page.goto("https://recursos-web-ten.vercel.app/");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const screenshotBuffer = await page.screenshot();

  await browser.close();

  const mockupBuffer = await sharp("assets/desktopMockup.png").toBuffer();

  const finalImageBuffer = await sharp(mockupBuffer)
    .composite([
      {
        input: screenshotBuffer,
        top: 308,
        left: 408,
      },
    ])
    .affine([
      [1, 0.3],
      [0.1, 0.7],
    ])
    .toBuffer();

  const carpeta = "imagenes/ima";
  const rutaCompleta = path.resolve(carpeta);

  if (!fs.existsSync(rutaCompleta)) {
    fs.mkdirSync(rutaCompleta, { recursive: true });
  }

  fs.writeFile(
    path.join(rutaCompleta, "imagen-final.png"),
    finalImageBuffer,
    (err) => {
      if (err) {
        console.error("Error al guardar la imagen final:", err);
        return;
      }
      console.log("Imagen final guardada exitosamente");
    }
  );
}

captureScreenshotTor();
