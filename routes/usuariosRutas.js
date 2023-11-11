const ruta = require("express").Router();
const { mostrarCursos, buscarCurso, buscarCursoTipo } = require("../database/cursosbd");
var { nuevoUsuario, buscarPorCorreo } = require("../database/usuariosbd");
var { validarPassword } = require("../middlewares/funcionesSecurity");


// pagina de inicio -------------------------------------------------------------------------------------------------------------
ruta.get("/", async (req, res) => {
  if(req.session.admin){
    var cursos = await mostrarCursos();
    res.render("home/homeLogin", {cursos});
  }
  else{
    var cursos = await mostrarCursos();
    res.render("home/home", {cursos});
  }
});


// login ------------------------------------------------------------------------------------------------------------------------
ruta.post("/login", async (req, res) => {
  var { correo, password } = req.body;
  var usuarioEncontrado = await buscarPorCorreo(correo);
  if (usuarioEncontrado) {
    var passwordCorrecto = await validarPassword(
      password,
      usuarioEncontrado.password,
      usuarioEncontrado.salt
    );
    if (passwordCorrecto) {
      if (usuarioEncontrado.admin) {
        req.session.admin = usuarioEncontrado.admin;
        res.redirect("/adminInicio");
      } else if(!usuarioEncontrado.admin){
        req.session.correo = usuarioEncontrado.correo;
        res.send(`<script>alert("Inicio de sesion exitoso"); window.location.href="/";</script>`);
      }
    } else {
      var error = "Correo o contraseña incorrecta";
      console.log(error);
      res.send(`<script>alert("${error}"); window.location.href="/iniciarSesion";</script>`);
    }
  } else {
    var error = "Correo o contraseña incorrecta";
    console.log(error);
    res.send(`<script>alert("${error}"); window.location.href="/iniciarSesion";</script>`);
  }
});

ruta.get("/iniciarSesion", (req, res) => {
  res.render("login/login")
});

// Nuevo usuario-----------------------------------------------------------------------------------------------------------------
ruta.get("/registro", (req, res) => {
  res.render("register/register");
});

ruta.post("/nuevousuario", async (req, res) => {
  var error = await nuevoUsuario(req.body);
  res.redirect("iniciarSesion");
});

// pagina de un curso (Reutilizable)
ruta.get("/curso/:id", async (req, res) => {
  try {
    var curso = await buscarCurso(req.params.id);
    if (curso) {
      res.render("curses/curso", { curso });
    } else {
      var error = "Curso no encontrado";
      console.log(error);
      res.send(`<script>alert("${error}"); window.location.href="/";</script>`);
    }
  } catch (err) {
    var error = "Error al buscar el curso";
    console.log(error);
    res.send(`<script>alert("${error}"); window.location.href="/";</script>`);
  }
});

// buscar curso -----------------------------------------------------------------------------------------------------------------

ruta.post("/buscarCurso", async (req, res) => {
  try {
    const terminoBusqueda = req.body.search; 
    const curso = await buscarCurso(terminoBusqueda);

    if (curso) {
      res.redirect(`/curso/${curso.id}`);
    } else {
      var error = "No se encontro el curso";
      console.log(error);
      res.send(`<script>alert("${error}"); window.location.href="/";</script>`);
    }
  } catch (err) {
    var error = "Error al buscar el curso";
    console.log(error);
    res.send(`<script>alert("${error}"); window.location.href="/";</script>`);
  }
});

ruta.get("/cerrarSesion", (req, res) => {
  // if (req.session && req.session.correo) {
  //   // Cerrar sesión si hay una sesión activa
  //   req.session = null;
  //   res.redirect("/");
  // } else {
  //   res.render("login/login");
  // }
  if(req.session.admin){
    req.session.admin = null;
    res.redirect("/");
  }
});


// categorias de cursos -----------------------------------------------------------------------------------------------

ruta.get("/tipo/:tipo", async (req, res) => {
  try {
    var tipo = req.params.tipo; 
    const cursos = await buscarCursoTipo(tipo);
    
    if (cursos.length > 0) {
      res.render("curses/categoryCurses", { cursos, tipo });
    } else {
      var error = "No se encontraron cursos para el tipo especificado.";
      console.log(error);
      res.send(`<script>alert("${error}"); window.location.href="/";</script>`);
    }
  } catch (err) {
    var error = "Error al buscar cursos por tipo";
    console.log(error);
    res.send(`<script>alert("${error}"); window.location.href="/";</script>`);
  } finally {
    // Redireccionar solo si no hay errores y la URL actual no es "/tipo/:tipo"
    if (!res.headersSent && req.originalUrl !== `/tipo/${tipo}`) {
      res.redirect(303, "/tipo");  // Redirige a la URL base "/tipo"
    }
  }
});



ruta.get("/ayuda", (req, res) => {
  res.render("ayuda/ayuda");
});

module.exports = ruta;
