const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');

// Profile model
const Profile = require('../../models/Profile');

// validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    tests posts route
// @access  public
router.get('/test', (req, res) => res.json({
    msg: 'Posts works'
}));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/',
    (req, res) => {
        Post.find()
            .sort({
                date: -1
            })
            .then(posts => res.json(posts))
            .catch(error =>
                res.status(404).json({
                    nopostsfound: 'No posts found'
                })
            );
    });

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(error =>
            res.status(404).json({
                nopostfound: 'No post found with that id.'
            })
        );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        const {
            errors,
            isValid
        } = validatePostInput(req.body);

        // check validation
        if (!isValid) {
            // if any errors, send 400 with error object
            return res.status(400).json(errors);
        }

        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });

        newPost
            .save()
            .then(post => res.json(post));
    }
);

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        Profile.findOne({
            user: req.user.id
        }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // check for post owner
                    // toString because req prop is string
                    if (post.user.toString() != req.user.id) {
                        return res
                            .status(401)
                            .json({
                                notauthorized: 'User not authorized.'
                            });
                    }

                    // perform delete from db
                    post
                        .remove()
                        .then(() => res.json({
                            success: true
                        }));
                })
                .catch(error => res.status(404).json({
                    postnotfound: 'No post found.'
                }));
        });
    }
);

// @route   POST api/like/:id
// @desc    Like a post
// @access  Private
router.post('/like/:id',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        Profile.findOne({
            user: req.user.id
        })
            .then(profile => {
                Post.findById(req.params.id)
                    .then(post => {
                        if (post.likes.filter(like => like.user.toString() === req.user.id)
                            .length > 0) {
                            return res
                                .status(400)
                                .json({
                                    alreadliked: 'User already liked this post.'
                                });
                        }

                        // add user id to likes array
                        post.likes.unshift({
                            user: req.user.id
                        });

                        // save to db
                        post
                            .save()
                            .then(post => res.json(post));
                    })
                    .catch(error => res.status(404).json({
                        postnotfound: 'No post found.'
                    }));
            });
    }
);

// @route   POST api/unlike/:id
// @desc    Unlike a post
// @access  Private
router.post('/unlike/:id',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, result) => {
        Profile.findOne({
            user: req.user.id
        }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id)
                        .length == 0) {
                        return result
                            .status(400)
                            .json({
                                notliked: 'You have not yet liked this post'
                            });
                    }

                    // get remove index
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    // splice out of array
                    post.likes.splice(removeIndex, 1);

                    // save to db
                    post.
                        save()
                        .then(post => result.json(post));
                })
                .catch(error => result.status(404).json({
                    postnotfound: 'No post found.'
                }));
        });
    }
);

module.exports = router;