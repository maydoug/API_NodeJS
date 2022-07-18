const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    sobrenome: String,
    email: String,
    fone: Number,
    app: String,
    pais: String,
    descricao: String,
})


module.exports = Person ;
