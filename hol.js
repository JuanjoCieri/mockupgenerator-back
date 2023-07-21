import fs from "fs";
import puppeteer from "puppeteer";
import Jimp from "jimp";
import path from "path";

const perspectiveMatrix = [
  [1.5, 0.2, 0],
  [-0.3, 1.1, 0],
  [-0.0005, 0.0015, 1],
];

// Función para aplicar la transformación de perspectiva a un punto (x, y)
function applyPerspective(point) {
  const [x, y] = point;
  const newX = (perspectiveMatrix[0][0] * x + perspectiveMatrix[0][1] * y + perspectiveMatrix[0][2]) / (perspectiveMatrix[2][0] * x + perspectiveMatrix[2][1] * y + perspectiveMatrix[2][2]);
  const newY = (perspectiveMatrix[1][0] * x + perspectiveMatrix[1][1] * y + perspectiveMatrix[1][2]) / (perspectiveMatrix[2][0] * x + perspectiveMatrix[2][1] * y + perspectiveMatrix[2][2]);
  return [newX, newY];
}

async function phone2Mockup() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  const viewportWidth = 1290;
  const viewportHeight = 768;

  await page.setViewport({
    width: viewportWidth,
    height: viewportHeight,
    deviceScaleFactor: 1,
  });

  await page.goto("https://recursos-web-ten.vercel.app/");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const screenshotBuffer = await page.screenshot();

  await browser.close();

  const image = await Jimp.read(screenshotBuffer);

  // Aplicar la transformación de perspectiva a los cuatro puntos de la imagen original
  const topLeft = applyPerspective([0, 0]);
  const topRight = applyPerspective([viewportWidth, 0]);
  const bottomLeft = applyPerspective([0, viewportHeight]);
  const bottomRight = applyPerspective([viewportWidth, viewportHeight]);

  // Crear una nueva imagen con el mismo tamaño que la imagen original
  const transformedImage = await new Jimp(viewportWidth, viewportHeight);

  // Copiar los píxeles de la imagen original a la nueva imagen aplicando la transformación de perspectiva
  transformedImage.scan(0, 0, transformedImage.bitmap.width, transformedImage.bitmap.height, (x, y, idx) => {
    const originalX = x + applyPerspective([x, y])[0];
    const originalY = y + applyPerspective([x, y])[1];
    const originalIdx = (Math.floor(originalX) + Math.floor(originalY) * image.bitmap.width) * 4;
    transformedImage.bitmap.data[idx] = image.bitmap.data[originalIdx]; // R
    transformedImage.bitmap.data[idx + 1] = image.bitmap.data[originalIdx + 1]; // G
    transformedImage.bitmap.data[idx + 2] = image.bitmap.data[originalIdx + 2]; // B
    transformedImage.bitmap.data[idx + 3] = image.bitmap.data[originalIdx + 3]; // A
  });

  const mockupBuffer = await Jimp.read("assets/desktopTorMockup.png");

  // Combinar la imagen transformada con el mockup
  mockupBuffer.composite(transformedImage, 321, 152);

  const carpeta = "imagenes/ima";
  const rutaCompleta = path.resolve(carpeta);

  if (!fs.existsSync(rutaCompleta)) {
    fs.mkdirSync(rutaCompleta, { recursive: true });
  }

  mockupBuffer.write(path.join(rutaCompleta, "imagen-final.png"), (err) => {
    if (err) {
      console.error("Error al guardar la imagen final:", err);
      return;
    }
    console.log("Imagen final guardada exitosamente");
  });
}

phone2Mockup();
