const mongoose = require('mongoose');

const { Schema } = mongoose;

const Board = new Schema({
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    title: String,
    thumbnail: String,
    favorite: Boolean
});

Board.statics.findByAccountId = function(accountId) {
    return this.find({ account_id: accountId }).exec();
};

module.exports = mongoose.model('Board', Board);