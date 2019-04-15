const mongoose = require('mongoose');

/** Config */
require('dotenv').config();


/** Database */
mongoose.connect('mongodb://localhost:27017/login', {useNewUrlParser: true}).then(db => console.log('Base de datos conectada'));


module.exports = mongoose;

/**
 * Si uso process.env.DATABASE me tira error, dice que no es una string. Tengo que buscar cual es el problema. Por el momento lo solucione poniendo la url de la DB aca.
 */