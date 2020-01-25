const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./users-model.js');
const router = express.Router();

router.get('/users', (req, res) => res.status(200).send('Welcome to the Users Router'));

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    Users.addUser(user)
        .then(saved => res.status(201).json(saved))
        .catch(err => {
            res.status(500).json({error: err, message: 'Failure to add user'})
        });
});

module.exports = router;