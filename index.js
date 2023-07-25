import express from "express";
import { captureScreenshots } from "./functions/captureScreenshots.js";
import cors from "cors";
import { getDeviceFromFileName } from "./functions/getDeviceFromFileName.js";

const app = express();
const PORT = process.env.PORT || 3000;

function setHeaders(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://mockupgenerator.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, token, session, cookie"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
}

app.use(setHeaders);

app.use(
  cors({
    credentials: true,
    origin: "https://mockupgenerator.vercel.app",
  })
);

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

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
