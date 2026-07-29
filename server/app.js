const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the CareCompass API");
});

app.get("/api/health", (req, res) => {
  res.json({
    message: "CareCompass API is running",
  });
});

module.exports = app;