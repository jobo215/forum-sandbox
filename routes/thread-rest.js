const express = require('express');
const router = express.Router({mergeParams : true});

const threadRestController = require('../controllers/thread-rest');

router.get('/get-by-language/:language', threadRestController.getThreadByLanguageName);

router.get('/latest', threadRestController.getLatestThreads);

module.exports = router;