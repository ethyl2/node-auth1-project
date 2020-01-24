const express = require('express');
const Users = require('./users-model.js');
const router = express.Router();

router.get('/users', (req, res) => res.status(200).send('Welcome to the Users Router'));

module.exports = router;