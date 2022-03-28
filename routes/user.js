const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/add-thread', userController.getAddThread);

router.post('/add-thread', userController.postAddThread);

module.exports = router;