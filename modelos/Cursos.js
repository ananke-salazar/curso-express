const mongoose = require('mongoose');
const { Schema } = mongoose;

const Curso = new Schema();

Curso.add({
    nombre: {type: String, required:true},
    ciclo: {type: String, required: true},
    listaDeEstudiantes: {type: Array, required: true},
    idDocente: {type: String, required: true}
});

module.exports = mongoose.model('Curso', Curso);