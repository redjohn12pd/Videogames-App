const {Router} = require('express');
const router = Router();
const videogames = require('../controllers/Videogames.js')
const {Key} = process.env;
router.get('/',videogames.getVideogames);//funciona
router.get('/:id',videogames.getVideogame);//funciona
router.post('/',videogames.insertVideogame);//funciona
module.exports = router;


