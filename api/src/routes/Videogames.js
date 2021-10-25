const {Router} = require('express');
const router = Router();
const videogames = require('../controllers/Videogames.js')
const {Key} = process.env;
router.get('/',videogames.getAll);//funciona
router.get('/:id',videogames.getById);//funciona
router.post('/',videogames.insert);//funciona
module.exports = router;


