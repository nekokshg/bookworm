const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    icon: String,
    criteria: {
        type: String,
    },
    category: {
        type: String,
    }
});

const Badge = mongoose.model('Badge', badgeSchema);
module.exports = Badge;