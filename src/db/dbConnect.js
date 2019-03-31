const mongoose = require("mongoose");

require("../config/config");

const dbURL = process.env.DB_URI;
mongoose.connect(dbURL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to database..");
});
