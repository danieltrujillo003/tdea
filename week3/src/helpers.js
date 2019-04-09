const hbs = require("hbs");
const { courses } = require("./controllers");

hbs.registerHelper("listCourses", () => {
  let info = "";
  avaliableCourses = courses.filter(
    course => course.avaliable === "disponible"
  );
  avaliableCourses.forEach(course => {
    info += `<h2><a href="/lista/${course.id}">${course.name}</a></h2>
    <p><strong>Descripción:</strong> ${course.description}</p>
    <p><strong>Precio:</strong> $${course.value}</p>
    <br>`;
  });
  return info;
});

hbs.registerHelper("listCoursesAdmin", () => {
  let info = '<form action="" method="POST">';
  courses.forEach(course => {
    info += `<h2>${course.name}</h2>
    `
    course.suscribed.forEach(user => {
      info += `
      <label><input type="checkbox" name="name" value="${course.id}+${user.name}">${user.name}</label><br>
      
      `
    })
  });
  info += '<br><button type="submit">Eliminar</button></form>';
  return info;
});

hbs.registerHelper("createCourse", (newCourse, errMsg) => {
  return errMsg ? errMsg : newCourse.name;
});

hbs.registerHelper("courseUpdatedHelper", (updatedCourse, msg) => {
  return msg ? msg : (`${updatedCourse.name} = ${updatedCourse.avaliable}`);
});

hbs.registerHelper("getSingleCourse", singleCourse => {
  let info = `<p><strong>Descripción:</strong> ${singleCourse.description}</p>
    <p><strong>Precio:</strong> $${singleCourse.value}</p>
    <p><strong>Modalidad:</strong> ${singleCourse.mode}</p>
    <p><strong>Intensidad horaria:</strong> ${singleCourse.hours}</p>
    <br>`;
  return info;
});

hbs.registerHelper("updateHelper", () => {
  let info = `<label>Curso: <select name="name">`
  courses.forEach(course => {
    info += `<option value="${course.name}">${course.name}</option>`    
  });
  info += `</select></label>`
  return info;
});

hbs.registerHelper("courseSubscribedHelper", (name, course, msg) => {
  return msg ? msg : (`${name} subscribed to ${course}`);  
})
