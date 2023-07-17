import fs from "fs";
import puppeteer from "puppeteer";
import sharp from "sharp";
import path from "path";

async function laptopMockup() {
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

  const mockupBuffer = await sharp("assets/laptopMockup.png").toBuffer();

  const finalImageBuffer = await sharp(mockupBuffer)
    .composite([
      {
        input: screenshotBuffer,
        top: 308,
        left: 408,
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

async function laptopTorMockup() {
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

  const mockupBuffer = await sharp("assets/desktopTorMockup.png").toBuffer();

  const finalImageBuffer = await sharp(mockupBuffer)
    .composite([
      {
        input: screenshotBuffer,
        top: 308,
        left: 408,
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

async function desktopMockup() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  const viewportWidth = 1143;
  const viewportHeight = 649;

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
        top: 218,
        left: 381,
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

async function tabletMockup() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  const viewportWidth = 714;
  const viewportHeight = 948;

  await page.setViewport({
    width: viewportWidth,
    height: viewportHeight,
    deviceScaleFactor: 1,
  });

  await page.goto("https://recursos-web-ten.vercel.app/");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const screenshotBuffer = await page.screenshot();

  await browser.close();

  const mockupBuffer = await sharp("assets/tabletMockup.png").toBuffer();

  const finalImageBuffer = await sharp(mockupBuffer)
    .composite([
      {
        input: screenshotBuffer,
        top: 270,
        left: 393,
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

laptopTorMockup();  
