const mongoose = require('mongoose');
const { Schema } = mongoose;

const Docente = new Schema();

Docente.add({
    nombre: {type: String, required:true},
    informacionLaboral: {type: Object, required: true}
});

module.exports = mongoose.model('Docente', Docente);