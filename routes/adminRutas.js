const rutaAd = require("express").Router();
var fs = require("fs");
var { adminAutorizado } = require("../middlewares/funcionesSecurity");
var subirArchivo = require("../middlewares/subirArchivos");
const { mostrarCursos, nuevoCurso } = require("../database/cursosbd");

rutaAd.get("/adminInicio", adminAutorizado, async (req, res) => {
    var cursos = await mostrarCursos();
    var sesion = req.session;
    res.render("admin/homeAdmin", { cursos, sesion });
});

rutaAd.get("/addCurses", adminAutorizado, async (req, res) => {
    var cursos = await mostrarCursos();
    res.render("admin/addCurses", { cursos });
});

rutaAd.post("/nuevocurso", subirArchivo(), (req, res) => {
    console.log("Ruta /nuevocurso alcanzada");
    console.log(req.body);  // Imprime otros datos del formulario
    console.log(req.file);  // Imprime el archivo subido
    req.body.video = req.file.originalname;
    var error = nuevoCurso(req.body);
    res.redirect("/");
});


module.exports = rutaAd;