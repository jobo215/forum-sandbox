const express = require('express');
const router = express.Router();

const publicController = require('../controllers/public');

router.get('/', publicController.indexGet);

router.get('/login', publicController.loginGet);

router.post('/login', publicController.loginPost);

router.get('/register', publicController.registerGet);

router.post('/register', publicController.registerPost);


module.exports = router;