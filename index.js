var express = require("express");
var path = require("path");
var session = require("cookie-session")
require("dotenv").config();
var rutas = require("./routes/usuariosRutas");
var rutasAd = require("./routes/adminRutas");


var app = express();
app.use(session({
  name:'session',
  keys:['askfhvakjrhsfiuvabñoweucbÑSID'],
  maxAge: 24 * 60 * 60 * 1000
}));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "/web")));
app.use("/", rutas);
app.use("/", rutasAd);


var port = process.env.port || 3000;

app.listen(port, () => {
  console.log("Servidor en http://localhost:" + port);
});
