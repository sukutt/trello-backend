const Router = require('koa-router');

const auth = new Router();
const authCtrl = require('./auth.controller');

auth.post('/signup', authCtrl.signUp);
auth.post('/signin', authCtrl.signIn);
auth.post('/signInWithOAuth', authCtrl.signInWithOAuth);
auth.get('/exists/:key(email|userid)/:value', authCtrl.exists);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check);

module.exports = auth;