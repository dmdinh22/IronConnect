const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load user model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    tests users route
// @access  public
router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

// @route   POST api/users/register
// @desc    register user
// @access  public
router.post('/register', (req, res) => {
    // destructure errors and isValid properties, pass in request body prop
    const { errors, isValid } = validateRegisterInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already registered';
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', // size
                r: 'r', //rating
                d: 'mm' //default
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route   POST api/users/login
// @desc    log in user / return JWT token
// @access  public
router.post('/login', (req, res) => {
    // destructure errors and isValid properties, pass in request body prop
    const { errors, isValid } = validateLoginInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = 'User not found.';
            return res.status(404).json(errors);
        }

        // check pw match using bcrypt
        bcrypt
            .compare(password, user.password) // password from request, password from user in db
            .then(isMatch => {
                if (isMatch) {
                    // user matched
                    // create jwt payload
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    };

                    // sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 3600 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        }
                    );
                } else {
                    errors.password = 'Password incorrect.';
                    return res.status(400).json(errors);
                }
            });
    });
});

// @route   POST api/users/current
// @desc    return current user
// @access  private
router.get(
    '/current',
    // use passport for auth
    passport.authenticate('jwt', { session: false }),
    (req, result) => {
        result.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            msg: 'Success'
        });
    }
);

module.exports = router;
