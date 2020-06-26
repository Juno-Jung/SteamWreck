'use strict';

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/user/:id', UserController.getAll);
router.post('/deleteall', UserController.deleteAll);

module.exports = router;
