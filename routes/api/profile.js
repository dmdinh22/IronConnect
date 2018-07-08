const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport'); // protected routes

// load profile model
const Profile = require('../../models/Profile');

// load user profile model
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    tests profile route
// @access  public
router.get('/test', (req, res) => res.json({
    msg: 'Profile works'
}));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
    '/',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        const errors = {}; // errors obj to pass in for response status

        Profile.findOne({
            user: req.user.id // getting from response schema id
        })
        // grab user info from another model in db
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user.';
                    return res.status(404).json(errors);
                }
                res.json(profile); // 200 response - OK
            })
            .catch(error => res.status(404).json(error));
    }
);

module.exports = router;