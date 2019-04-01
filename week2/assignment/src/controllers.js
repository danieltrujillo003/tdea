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
    avaliable: "disponible"
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
  
};
