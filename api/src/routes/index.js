const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRoutes = require('./Videogames.js');
const genresRoutes = require('./Genres.js');
const platformsRoutes = require('./Platforms.js');
const router = Router();
router.use('/videogames', videogamesRoutes);
router.use('/genres', genresRoutes);
router.use('/platforms', platformsRoutes);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
