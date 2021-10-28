const express = require('express');
const router = express();
const controllerPlatforms = require('../controllers/Platforms');

router.get('/',controllerPlatforms.getPlatforms);

module.exports = router;