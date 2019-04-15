const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const hbs = require("hbs");
const {routes} = require("./routes");
const mongoose = require("mongoose");
require('./config');

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerPartials("views/partials");
require("./helpers");

app.set("view engine", "hbs");

routes(app);

mongoose
  .connect(
    process.env.URLDB,
    { useNewUrlParser: true }
  )
  .then(() => app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`)))
  .catch(err => console.log(err))
  .finally(() => console.log("Ran connection to db and server"));
