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

Board.statics.createBoard = function(params) {
    const newBoard = new this(params);
    return newBoard.save();
};

Board.statics.updateBoard = function(params) {
    const { id, ...rest } = params;
    return this.findOneAndUpdate({ _id: id }, rest, {
        new: true
    });
};

module.exports = mongoose.model('Board', Board);