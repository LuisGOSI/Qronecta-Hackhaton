class Curso {
    constructor(id, data) {
        this.bandera = 0;
        this.id = id;
        this.titulo = data.titulo;
        this.descripcion = data.descripcion;
        this.tipo = data.tipo;
        this.autor = data.autor;
        this.video = data.video;
    }

    set id(id) {
        if (id != null) id.length > 0 ? (this._id = id) : (this.bandera = 1);
    }
    set titulo(titulo) {
        titulo.length > 0 ? (this._titulo = titulo) : (this.bandera = 1);
    }
    set descripcion(descripcion) {
        descripcion.length > 0 ? (this._descripcion = descripcion) : (this.bandera = 1);
    }
    set autor(autor) {
        autor.length > 0 ? (this._autor = autor) : (this.bandera = 1);
    }
    set video(video) {
        video.length > 0 ? (this._video = video) : (this.bandera = 1);
    }
    set tipo(tipo) {
        tipo.length > 0 ? (this._tipo = tipo) : (this.bandera = 1);
    }
    get id() {
        return this._id;
    }
    get titulo() {
        return this._titulo;
    }
    get descripcion() {
        return this._descripcion;
    }
    get autor() {
        return this._autor;
    }
    get video() {
        return this._video;
    }
    get tipo() {
        return this._tipo;
    }
    get obtenerDatos() {
        if (this._id != null) {
            return {
                id: this.id,
                titulo: this.titulo,
                descripcion: this.descripcion,
                autor: this.autor,
                video: this.video,
                tipo: this.tipo,
            };
        } else {
            return {
                titulo: this.titulo,
                descripcion: this.descripcion,
                autor: this.autor,
                video: this.video,
                tipo: this.tipo,
            };
        }
    }
}

module.exports = Curso;
