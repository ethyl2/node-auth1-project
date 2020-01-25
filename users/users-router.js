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

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Users.findUserByUsername(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                //TODO: create a new session for the user
                //TODO: send cookie that contains the user id
                res.status(200).json({message: 'Logged in successfully', user_id: user.id})
            } else {
                res.status(401).json({message: 'Invalid credentials'})
            }
        })
        .catch(err => {
            res.status(500).json({error: err, message: 'Failure to log in'})
        });
});

module.exports = router;