import express from "express";
import { captureScreenshots } from "./captureScreenshots.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/captures", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  const images = await captureScreenshots(url);

  const deviceMap = {};

  for (const image of images) {
    const device = getDeviceFromFileName(image.filename);
    if (!deviceMap[device]) {
      deviceMap[device] = [];
    }
    deviceMap[device].push(image);
  }

  const responseArray = Object.keys(deviceMap).map((device) => ({
    device,
    photos: deviceMap[device],
  }));

  res.json(responseArray);
});

function getDeviceFromFileName(filename) {
  if (filename.includes("laptop")) {
    return "Laptop";
  } else if (filename.includes("desktop")) {
    return "Desktop";
  } else if (filename.includes("phone")) {
    return "Móvil";
  } else if (filename.includes("tablet")) {
    return "Tablet";
  }
  return "other";
}

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
