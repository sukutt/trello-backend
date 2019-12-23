const mongoose = require('mongoose');

const { Schema } = mongoose;

const BoardImage = new Schema({
    img: String
});

BoardImage.statics.getBoardImages = function() {
    return this.find({});
};

module.exports = mongoose.model('BoardImage', BoardImage);