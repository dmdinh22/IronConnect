const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport'); // protected routes

// load validation
const validateProfileInput = require('../../validation/profile');

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

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({
        handle: req.params.handle
    })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user.';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(error =>
            res.status(404)
                .json({
                    profile: 'There is no profile for this user.',
                    error: error
                })
        );
});

// @route   POST api/profile
// @desc    Create/edit user profile
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
    // destructure
        const {
            errors,
            isValid
        } = validateProfileInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;

        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.sport) profileFields.sport = req.body.sport;
        if (req.body.bio) profileFields.bio = req.body.bio;

        // SKILLS - Spilt into array
        if (typeof req.body.skills !== 'undefined') { // make sure skills exists
            profileFields.skills = req.body.skills.split(','); // split into array
        }
        if (req.body.skillevel) profileFields.skillevel = req.body.skillevel;

        // SOCIAL
        profileFields.social = {};
        if (req.body.website) profileFields.social.website = req.body.website;
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

        Profile.findOne({
            user: req.user.id
        }).then(profile => {
            if (profile) {
                // update if profile exists
                Profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    // set all the profile fields from the object created above
                    $set: profileFields
                }, {
                    new: true
                }).then(profile => res.json(profile));
            } else {
                // create if profile DNE

                // Check if handle exists
                Profile.findOne({
                    handle: profileFields.handle
                }).then(profile => {
                    if (profile) {
                        errors.handle = 'That handle already exists';
                        res.status(400).json(errors);
                    }

                    // Save Profile
                    new Profile(profileFields)
                        .save()
                        .then(profile => res.json(profile));
                });
            }
        });
    }
);

module.exports = router;