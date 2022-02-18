const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const WechatStrategy = require("passport-wechat");
const QQStrategy = require('passport-qq').Strategy;
const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'user[phone]',
    passwordField: 'user[password]'
}, function (phone, password, done) {
    User.findOne({phone: phone}).then(function (user) {
        if (!user || !user.validPassword(password)) {
            return done(null, false, {errors: {'phone or password': 'is invalid'}});
        }
        return done(null, user);
    }).catch(done);
}));

passport.use(new WechatStrategy({
        appID: 'APPID',
        name: 'wechat',
        appSecret: 'APPSECRET',
        client: 'wechat',
        callbackURL: 'http://127.0.0.1:3000/user/wechat/oauth-callback',
        scope: 'snsapi_userinfo',
        state: 'STATE'
    },
    function (accessToken, refreshToken, profile, expires_in, done) {
        return done(null, profile);
    }
));

passport.use(new QQStrategy({
        clientID: 'client_id',
        clientSecret: 'client_secret',
        callbackURL: "http://127.0.0.1:3000/user/qq/oauth-callback"
    },
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));
