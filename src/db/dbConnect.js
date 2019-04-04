const mongoose = require("mongoose");

require("../config/config");
const logger = require("../server/winstonLogger");

async function connectToDB() {
  try {
    const dbURL = process.env.DB_URI;
    await mongoose.connect(dbURL, { useNewUrlParser: true });
    console.log("connected to db");
  } catch (e) {
    logger.log({
      level: "error",
      message: e
    });
    process.exit();
  }
}

connectToDB();

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("Connected to database..");
// });
