const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    location: {
        type: String
    },
    sport: {
        type: String
    },
    skills: {
        type: [String], // array of strings
        required: true
    },
    skilllevel: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    meets: [{
        title: {
            type: String,
            required: true
        },
        federation: {
            type: String,
            required: true
        },
        location: {
            type: String
        },
        datestart: {
            type: Date,
            required: true
        },
        dateend: {
            type: Date
        },
        description: {
            type: String
        },
        awards: {
            type: String
        }
    }],
    social: {
        website: {
            type: String
        },
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);