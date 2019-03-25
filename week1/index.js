const { courses } = require("./db");
const fs = require("fs");
const argv = require("yargs")
  .command("inscribir", "Genera proceso de inscripción al curso seleccionado", {
    id: {
      alias: "i",
      demandOption: true,
      desc: "ID del curso",
    },
    nombre: {
      alias: "n",
      demandOption: true,
      desc: "Nombre del estudiante",
      type: "string"
    },
    cedula: {
      alias: "c",
      demandOption: true,
      desc: "Cédula del estudiante",
    }
  })
  .argv;

if (argv.i) {
  let selectedCourse = courses.find(el => el.id == argv.i);
  if (selectedCourse) {
    console.log(selectedCourse);
    let msg = `El estudiante ${argv.n} con cédula ${argv.c} se ha inscrito existosamente al curso ${selectedCourse.name} que tiene una duración de ${selectedCourse.duration} horas y un costo de $${selectedCourse.cost}.`;
    fs.writeFile(`insc${argv.n}.txt`, msg, err => {
      if (err) throw err;
      console.log("Se ha generado el archivo.");
    });
  } else {
    console.log("Ingrese un id válido");
  }
} else {
  let time = 1;
  for (course of courses) {
    let { id, name, duration, cost } = course;
    setTimeout(
      () =>
        console.log(
          `El curso ${id} se llama ${name}, tiene una duración de ${duration} horas y un costo de $${cost}.`
        ),
      time * 1000
    );
    time++;
  }
}
