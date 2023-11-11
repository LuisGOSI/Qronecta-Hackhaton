var crypto = require("crypto")

function encriptarPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var hash = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString('hex');
    return { salt, hash }

}

function validarPassword(password, hash, salt) {
    var hashEvaluar = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hashEvaluar == hash;
}

function autorizado(req, res, cb) {
    if (req.session.correo || req.session.admin) cb();
    else res.redirect("/iniciarSesion");
}

function adminAutorizado(req, res, cb) {
    if (req.session.admin){
    cb();
    }
    else res.redirect("/iniciarSesion");
}

module.exports = {
    encriptarPassword,
    validarPassword,
    autorizado,
    adminAutorizado
}