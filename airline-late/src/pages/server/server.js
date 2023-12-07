const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("Nenhum arquivo enviado.");
  }

  const fileData = file.buffer.toString("utf-8");
  const filePath = path.join(__dirname, "../assets/uploadedFile.csv");

  fs.writeFileSync(filePath, fileData);

  res.json({ filePath });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
