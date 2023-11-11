class Usuario {
    constructor(id, data) {
        this.bandera = 0;
        this.id = id;
        this.nombre = data.nombre;
        this.correo = data.correo;
        this.password = data.password;
        this.salt = data.salt;
        this.admin = data.admin; 
    }

    set id(id) {
        if (id != null) id.length > 0 ? (this._id = id) : (this.bandera = 1);
    }
    set nombre(nombre) {
        nombre.length > 0 ? (this._nombre = nombre) : (this.bandera = 1);
    }
    set password(password) {
        password.length > 0 ? (this._password = password) : (this.bandera = 1);
    }
    set salt(salt) {
        salt.length > 0 ? (this._salt = salt) : (this.bandera = 1);
    }
    set correo(correo) {
        correo.length > 0 ? (this._correo = correo) : (this.bandera = 1);
    }
    get id() {
        return this._id;
    }
    get nombre() {
        return this._nombre;
    }
    get password() {
        return this._password;
    }
    get salt() {
        return this._salt;
    }
    get correo() {
        return this._correo;
    }
    get obtenerDatos() {
        if (this._id != null) {
            return {
                id: this.id,
                nombre: this.nombre,
                password: this.password,
                salt: this.salt,
                correo: this.correo,
                admin: this.admin
            };
        } else {
            return {
                nombre: this.nombre,
                password: this.password,
                salt: this.salt,
                correo: this.correo,
                admin: this.admin 
            };
        }
    }
}

module.exports = Usuario;
