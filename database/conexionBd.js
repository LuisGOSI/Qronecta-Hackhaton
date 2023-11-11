var admin=require("firebase-admin");
var keys=require("../qronecta-keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

var  micuenta=admin.firestore();
var conexion=micuenta.collection("Usuarios");
var conexionCursos=micuenta.collection("Cursos");

module.exports={
    conexion,
    conexionCursos,
};