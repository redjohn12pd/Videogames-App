const ModelCrud = require('./index.js');
const {Videogame} = require('../db.js');
const controllerCrud = new ModelCrud(Videogame);
module.exports = controllerCrud;