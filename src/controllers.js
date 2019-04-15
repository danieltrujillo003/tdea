const fs = require("fs");
const Course = require("./models/course");

let courses = fs.existsSync("./src/courses.json")
  ? require("./courses.json")
  : [];

const getIndex = (req, res) => {
  res.render("index", {
    title: "CRUD CURSOS"
  });
};

const getForm = (req, res) => {
  res.render("form", {
    title: "Ingresar curso"
  });
};

const getCourses = (req, res) => {
  Course.find({ avaliable: "disponible" }, (err, courses) => {
    if (err) {
      res.render("list", {
        title: "Error"
      });
    } else {
      res.render("list", {
        title: "Lista de cursos",
        list: courses
      });
    }
  });
};

const getSingleCourse = (req, res) => {
  Course.findOne({ id: req.params.id }, (err, result) => {
    if (err) {
      res.render("added", {
        title: "Error",
        content: err
      });
    } else {
      res.render("singleCourse", {
        title: result.name,
        singleCourse: result
      });
    }
  });
};

const postCourse = (req, res) => {
  const { name, id, description, value, mode, hours } = req.body;

  let course = new Course({
    name,
    id,
    description,
    value,
    mode,
    hours,
    suscribed: []
  });

  Course.find({}, (err, courses) => {
    if (err) {
      res.render("added", {
        title: "Error",
        content: err
      });
    } else if (courses.find(el => el.id === course.id)) {
      let errMsg = "El curso con el id ingresado ya existe";
      res.render("added", {
        title: "Curso no agregado",
        content: errMsg
      });
    } else {
      course.save((err, newCourse) => {
        if (err) {
          res.render("added", {
            title: "Falla agregando curso",
            content: err
          });
        } else {
          res.render("added", {
            title: "Curso agregado",
            content: `${newCourse.name} agregado`
          });
        }
      });
    }
  });
};

const get404 = (req, res) => {
  res.render("404");
};

const updateCourse = (req, res) => {
  Course.find({}, (err, courses) => {
    if (err) {
      res.render("update", {
        title: "Error",
        list: courses
      });
    } else {
      res.render("update", {
        title: "Actualizar estado de un curso",
        list: courses
      });
    }
  });
};

const courseUpdated = (req, res) => {
  const { name, avaliable } = req.body;
  Course.findOneAndUpdate({ name }, { avaliable }, (err, result) => {
    if (err) {
      res.render("added", {
        title: "Curso no actualizado",
        content: err
      });
    } else {
      result.avaliable = avaliable;
      res.render("added", {
        title: "Curso Actualizado",
        content: `${result.name} = ${result.avaliable}`
      });
    }
  });
};

const postSubscription = (req, res) => {
  const { name, id, email, phone, courseId } = req.body;
  // Course.find({$and: [{ suscribed: {id} }, { id: courseId }]}, (err, result) => {
  //   console.log(result)
  //   if (result) {
  //     res.render("subscribed", {
  //       title: "Inscripción no realizada",
  //       msg: "Estudiante ya matriculado en este curso"
  //     });
  //     return;
  //   }
  // })
  Course.findOneAndUpdate(
    { id: courseId },
    { $push: { suscribed: { name, id, email, phone } } },
    (err, result) => {
      console.log(result);
      if (err) {
        res.render("added", {
          title: "Curso no actualizado",
          content: err
        });
      }
      res.render("subscribed", {
        title: "Inscripción a un curso",
        name,
        course: result.name
      });
    }
  );
};

const getListAdmin = (req, res) => {
  Course.find({}, (err, courses) => {
    if (err) {
      res.render("list", {
        title: "Error"
      });
    } else if (!courses.length) {
      res.render("listAdmin", {
        title: "No hay cursos para listar",
        list: courses
      });
      return;
    } else {
      res.render("listAdmin", {
        title: "Lista de cursos (Coordinador)",
        list: courses
      });
    }
  });
};

const removeUser = (req, res) => {
  if (Array.isArray(req.body.name)) {
    req.body.name.forEach(name => {
      let userArray = name.split("+");
      handleRemove(userArray[0], userArray[1]);
    });
  } else {
    let userArray = req.body.name.split("+");
    handleRemove(userArray[0], userArray[1]);
  }
  Course.find({}, (err, courses) => {
    if (err) {
      res.render("list", {
        title: "Error"
      });
    } else {
      res.render("listAdmin", {
        title: "Lista de cursos (Coordinador)",
        list: courses
      });
    }
  });
};

const handleRemove = (id, name) => {
  Course.findOneAndUpdate(
    { id },
    { $pull: { suscribed: { name } } },
    (err, result) => {
      console.log(result);
    }
  );
};

module.exports = {
  courses,
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
};
