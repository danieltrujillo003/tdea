const {
  getForm,
  getIndex,
  postCourse,
  get404,
  getCourses,
  getSingleCourse,
  updateCourse,
  courseUpdated,
  postSubscription,
  getListAdmin,
  removeUser
} = require("./controllers");

module.exports.routes = app => {
  app.get("/", getIndex);
  app.get("/ingresar", getForm);
  app.post("/agregado", postCourse);
  app.get("/lista", getCourses);
  app.get("/lista/:id", getSingleCourse);
  app.get("/actualizar", updateCourse);
  app.post("/actualizado", courseUpdated);
  app.post("/inscrito", postSubscription);
  app.get("/listaAdmin", getListAdmin);
  app.post("/listaAdmin", removeUser);
  app.get("*", get404);
};
