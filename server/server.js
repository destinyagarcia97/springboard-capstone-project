const express = require("express");

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the CareCompass API");
});

app.get("/api/health", (req, res) => {
  res.json({
    message: "CareCompass API is running",
  });
});

app.listen(PORT, () => {
  console.log(`CareCompass server is running on port ${PORT}`);
});