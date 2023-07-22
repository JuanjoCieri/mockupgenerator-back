import fs from "fs";
import puppeteer from "puppeteer";
import sharp from "sharp";
import path from "path";

async function phone2Mockup() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  const viewportWidth = 1293;
  const viewportHeight = 822;

  await page.setViewport({
    width: viewportWidth,
    height: viewportHeight,
    deviceScaleFactor: 1,
  });

  await page.goto("https://recursos-web-ten.vercel.app/");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const screenshotBuffer = await page.screenshot();

  await browser.close();

  const mockupBuffer = await sharp("assets/desktop2Mockup.png").toBuffer();

  const finalImageBuffer = await sharp(mockupBuffer)
    .composite([
      {
        input: screenshotBuffer,
        top: 485,
        left: 314,
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

phone2Mockup();