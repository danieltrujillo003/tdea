const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const hbs = require("hbs");

const {
  getForm,
  getIndex,
  postCourse,
  get404,
  getCourses,
  getSingleCourse,
  updateCourse,
  courseUpdated,
  postSubscription
} = require("./controllers");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerPartials("views/partials");
require("./helpers");

app.set("view engine", "hbs");

app.get("/", getIndex);
app.get("/ingresar", getForm);
app.post("/agregado", postCourse);
app.get("/lista", getCourses);
app.get("/lista/:id", getSingleCourse);
app.get("/actualizar", updateCourse);
app.post("/actualizado", courseUpdated);
app.post("/inscrito", postSubscription);
app.get("*", get404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening at port ${PORT}...`));
