require("../config/config");
const mongoose = require("mongoose");

const dbURL = process.env.DB_URI;
mongoose.connect(dbURL, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to database..");
});
