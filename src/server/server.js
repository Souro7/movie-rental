require("../db/dbConnect");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const movieRoute = require("./routes/movieRoute");

app.use(bodyParser.json());
app.use("/", movieRoute);

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
