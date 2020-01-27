const Users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');


module.exports = function restricted(req, res, next) {
    //For day 1,
    //Client must put username and password in headers
    /*
    const { username, password } = req.headers;
    if (username && password) {
        Users.findUserByUsername(username)
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({message: 'Invalid credentials. You shall not pass!'})
                }
            })
            .catch(err => {
                res.status(500).json({error: err, message: 'Unable to retrieve user'})
            });
    } else {
        res.status(400).json({message: 'Please provide valid credentials'});
    }
    */

    //Day 2 uses the cookie instead:
   if (req.session && req.session.user) {
       next();
   } else {
       res.status(401).json({message: 'session is invalid'});
   }
}
