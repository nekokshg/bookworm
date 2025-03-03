//Define a tag schema for tag data
/**
 * Each tag includes the following:
 * name
 * popularityCount
 */

const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    popularityCount: {
        type: Number,
        default: 0
    }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;