const express = require('express');
const router = express();
const controllerGenres = require('../controllers/Genres.js')

router.get('/',controllerGenres.getGenres);

module.exports = router;