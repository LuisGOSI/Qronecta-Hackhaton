var conexion = require("./conexionBd").conexionCursos;
var Curso = require("../models/courses");

async function mostrarCursos() {
    var courses = [];
    try {
        var cursos = await conexion.get();
        cursos.forEach((curso) => {
            var course = new Curso(curso.id, curso.data());
            courses.push(course.obtenerDatos);
        });
    } catch (err) {
        console.log("Error al recuperar los cursos de la base de datos: " + err);
    }
    return courses;
}

async function nuevoCurso(datos) {
    var course = new Curso(null, datos);
    var error = 1;
    if (course.bandera == 0) {
        try {
            await conexion.doc(course.titulo).set(course.obtenerDatos);
            console.log("Curso insertado a la base de datos");
            error = 0;
        } catch (err) {
            console.log("Error al capturar el curso nuevo: " + err);
        }
    }
    return error;
}

async function buscarCurso(id) {
    try {
        var curso = await conexion.doc(id).get();
        if (curso.exists) {
            return new Curso(curso.id, curso.data());
        } else {
            console.log("No se encontro el curso");
        }
    } catch (err) {
        console.log("Error al buscar el curso " + err);
    }
}

async function buscarCursoTipo(tipo) {
    try {
        const consultaTodas = await conexion.get();
        if (consultaTodas.empty) {
            console.log("No se encontraron cursos en la base de datos.");
            return [];
        }
        const courses = [];
        consultaTodas.forEach((curso) => {
            const course = new Curso(curso.id, curso.data());
            if (course.tipo == tipo) {
                courses.push(course.obtenerDatos);
            }
        });
        return courses;

    } catch (err) {
        console.error("Error al buscar cursos por tipo: " + err);
    }
}

module.exports = {
    mostrarCursos,
    nuevoCurso,
    buscarCurso,
    buscarCursoTipo
}