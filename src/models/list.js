const mongoose = require('mongoose');

const { Schema } = mongoose;

const List = new Schema({
    board_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
    title: String,
    order: Number
});

List.statics.findByBoardId = function(boardId) {
    return this.find({ board_id: boardId }).exec();
};

List.statics.createList = function(params) {
    const newList = new this(params);
    return newList.save();
};

List.statics.updateList = function(params) {
    const { id, ...rest } = params;
    return this.findOneAndUpdate({ _id: id }, rest, {
        new: true
    });
};

module.exports = mongoose.model('List', List);

