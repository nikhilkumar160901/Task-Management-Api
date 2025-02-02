require("dotenv").config(); 
const app = require("./app");
const connectDB = require("./config/db");


const PORT = process.env.PORT || 4003;


async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start the server:", err.message);
    process.exit(1);
  }
}


startServer();
