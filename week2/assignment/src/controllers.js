const fs = require("fs");

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
  res.render("list", {
    title: "Lista de cursos"
  });
};

const getSingleCourse = (req, res) => {
  let singleCourse = courses.find(course => course.id === req.params.id);
  console.log(singleCourse);
  res.render("singleCourse", {
    title: singleCourse.name,
    singleCourse
  });
};

const postCourse = (req, res) => {
  const { name, id, description, value, mode, hours } = req.body;
  let newCourse = {
    name,
    id,
    description,
    value,
    mode,
    hours,
    avaliable: "disponible",
    suscribed: []
  };
  if (courses.find(el => el.id === newCourse.id)) {
    let errMsg = "El curso con el id ingresado ya existe";
    res.render("added", {
      title: "Curso no agregado",
      errMsg
    });
  } else {
    courses.push(newCourse);
    coursesStr = JSON.stringify(courses);
    fs.writeFile("src/courses.json", coursesStr, err => {
      if (err) throw err;
    });
    res.render("added", {
      title: "Curso agregado",
      newCourse
    });
  }
};

const get404 = (req, res) => {
  res.render("404");
};

const updateCourse = (req, res) => {
  res.render("update", {
    title: "Actualizar estado de un curso"
  });
};

const courseUpdated = (req, res) => {
  try {
    const { name, avaliable } = req.body;
    updatedCourse = courses.find(course => course.name === name);
    updatedCourse.avaliable = avaliable;
    res.render("updated", {
      title: "Curso Actualizado",
      updatedCourse
    });
  } catch (err) {
    res.render("updated", {
      title: "Curso no actualizado",
      msg: err
    });
  }
};

const postSubscription = (req, res) => {
  const { name, id, email, phone, courseId } = req.body;
  try {
    let selectedCourse = courses.find(course => course.id === courseId);
    if (selectedCourse.suscribed.some(user => user.id === id)) {
      res.render("subscribed", {
        title: "Inscripción no realizada",
        msg: "Estudiante ya matriculado en este curso"
      });
      return
    }
    selectedCourse.suscribed = [...selectedCourse.suscribed, {name, id, email, phone}];
    coursesStr = JSON.stringify(courses);
    fs.writeFile("src/courses.json", coursesStr, err => {
      if (err) throw err;
    });
    res.render("subscribed", {
      title: "Inscripción a un curso",
      name,
      course: selectedCourse.name
    });
  } catch (err) {
    res.render("subscribed", {
      title: "Inscripción no realizada",
      msg: err
    });
  }
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
  postSubscription
};
