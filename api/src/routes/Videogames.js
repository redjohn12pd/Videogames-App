const {Router} = require('express');
const router = Router();
const videogames = require('../controllers/Videogames.js')
router.get('/',videogames.getVideogames);
router.get('/:id',videogames.getVideogame);
router.post('/',videogames.insertVideogame);
module.exports = router;


