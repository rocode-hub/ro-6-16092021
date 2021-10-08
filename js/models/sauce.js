/* --------------------------------------------------------------------------------
object  ... sauce model
-------------------------------------------------------------------------------- */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, unique: true, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, default: 1 },
    likes: { type: Number, default: 0},
    dislikes: { type: Number, default: 0},
    usersLiked: [{ userId: String }],
    usersDisliked: [{ userId: String }]
});

sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauce', sauceSchema);