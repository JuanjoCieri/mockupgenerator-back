import express from "express";
import fs from "fs";
import path from "path";
import { captureScreenshots } from "./captureScreenshots.js";

const app = express();
const PORT = 3000;

app.get("/captures", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  await captureScreenshots(url);

  // Get the current directory path using import.meta.url
  const currentDir = new URL(".", import.meta.url).pathname;

  const imagesFolder = path.join(currentDir, "imagenes", "ima");
  const imageFiles = fs.readdirSync(imagesFolder);

  const images = imageFiles.map((filename) => ({
    filename,
    imageUrl: `http://localhost:${PORT}/imagenes/ima/${filename}`,
  }));

  res.json({ images });
});

app.use("/imagenes/ima", express.static("imagenes/ima"));

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
