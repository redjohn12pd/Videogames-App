const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRoutes = require('./Videogames.js');

const router = Router();
router.use('/videogames', videogamesRoutes);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
