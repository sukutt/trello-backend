const { generateToken } = require('lib/token');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const crypto = require('crypto');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
    profile: {
        userId: String,
        thumbnail: { type: String, default: '/static/images/default_thumbnail.png' }
    },
    email: { type: String },
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        }
    },
    password: String,
    createdAt: { type: String, default: Date.now }
});

Account.statics.findByUserId = function(userId) {
    return this.findOne({ 'profile.userId': userId });
};

Account.statics.findByEmail = function(email) {
    return this.findOne({ email });
};

Account.statics.findByEmailOrUserId = function({ userId, email }) {
    return this.findOne({
        $or: [
            { 'profile.userId': userId },
            { email }
        ]
    });
};

//  회원가입 
Account.statics.signUp = function({ userId, email, password }) {
    const account = new this({
        profile: {
            userId
        },
        email,
        password: password ? hash(password) : undefined
    });

    console.log(account);

    return account.save();
};

Account.methods.validatePassword = function(password) {
    const hashed = hash(password);
    return this.password === hashed;
};

Account.methods.generateToken = function() {
    const payload = {
        _id: this._id,
        profile: this.profile
    };

    return generateToken(payload, 'account');
};

module.exports = mongoose.model('Account', Account);