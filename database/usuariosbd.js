var conexion = require("./conexionBd").conexion;
var Usuario = require("../models/users");
var { encriptarPassword } = require("../middlewares/funcionesSecurity");

async function buscarPorCorreo(correo) {
    var user = "";
    try {
        var usuarios = await conexion.where("correo", "==", correo).get();
        usuarios.forEach((usuario) => {
            var usuarioObjeto = new Usuario(usuario.id, usuario.data());
            if (usuarioObjeto.bandera == 0) {
                user = usuarioObjeto.obtenerDatos;
            }
        });
    } catch (err) {
        console.log("Error al recuperar el usuario: " + err);
    }
    return user;
}

async function buscarPorID(id) {
    var user = "";
    try {
        var usuario = await conexion.doc(id).get();
        var usuarioObjeto = new Usuario(usuario.id, usuario.data());
        if (usuarioObjeto.bandera == 0) {
            user = usuarioObjeto.obtenerDatos;
        }
    } catch (err) {
        console.log("Error al recuperar el usuario: " + err);
    }
    return user;
}

async function nuevoUsuario(datos) {
    var { hash, salt } = encriptarPassword(datos.password);
    datos.password = hash;
    datos.salt = salt;
    datos.admin = false;
    var user = new Usuario(null, datos);
    var error = 1;
    if (user.bandera == 0) {
        try {
            await conexion.doc().set(user.obtenerDatos);
            console.log("Usuario insertado a la base de datos");
            error = 0;
        } catch (err) {
            console.log("Error al capturar el nuevo usuario: " + err);
        }
    }
    return error;
}

module.exports = {
    buscarPorID,
    buscarPorCorreo,
    nuevoUsuario,
};