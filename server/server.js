const app = require("./app");
const connectDB = require("./config/db");

const PORT = 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`CareCompass server is running on port ${PORT}`);
  });
}

startServer();