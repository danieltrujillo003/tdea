const { courses } = require("./db");
const app = require("express")();
const argv = require("yargs").command(
  "inscribir",
  "Genera proceso de inscripción al curso seleccionado",
  {
    id: {
      alias: "i",
      demandOption: true,
      desc: "ID del curso"
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
      desc: "Cédula del estudiante"
    }
  }
).argv;

if (argv.i) {
  let selectedCourse = courses.find(el => el.id == argv.i);
  if (selectedCourse) {
    let msg = `El estudiante ${argv.n} con cédula ${
      argv.c
    } se ha inscrito existosamente al curso ${
      selectedCourse.name
    } que tiene una duración de ${
      selectedCourse.duration
    } horas y un costo de $${selectedCourse.cost}.`;
    app.get("/", (req, res) => res.send({ msg }));
  } else {
    app.get("/", (req, res) => res.send({ err: "Ingrese un id válido" }));
  }
} else {
  app.get("/", (req, res) =>
    res.send({cursos: [
      {[courses[0].name]: `El curso ${courses[0].id} se llama ${courses[0].name}, tiene una duración de ${courses[0].duration} horas y un costo de $${courses[0].cost}.`},
      {[courses[1].name]: `El curso ${courses[1].id} se llama ${courses[1].name}, tiene una duración de ${courses[1].duration} horas y un costo de $${courses[1].cost}.`},
      {[courses[2].name]: `El curso ${courses[2].id} se llama ${courses[2].name}, tiene una duración de ${courses[2].duration} horas y un costo de $${courses[2].cost}.`}
    ]})
  );
}
app.listen(3000, () => console.log("Listening on port 3000..."));
