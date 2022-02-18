const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const { uuid } = require('uuidv4');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        unique: true,
        required: [true, "can't be blank"],
        index: true
    },
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    phone: {type: String, unique: true, required: [true, "can't be blank"], match: [/\d{11}/, 'is valid'], index: true},
    avatar: {type: String, default: ""},
    avatar_new_path: {type: String, default: ""},
    avatar_status: { type: Number, default: 0 },
    avatar_reject_reason: {type: String, default: ''},
    gender: { type: String, default: "男" },
    nickname: {type: String, default: ""},
    nickname_status: { type: Number, default: 1 },
    nickname_reject_reason: {type: String, default: ''},
    bookshelves: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bookshelf'}],
    books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}],
    recommends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recommend'}],
    plans: [{type: mongoose.Schema.Types.ObjectId, ref: 'Plan'}],
    musics: [{type: mongoose.Schema.Types.ObjectId, ref: 'Music'}],
    notices: [{type: mongoose.Schema.Types.ObjectId, ref: 'Notice'}],
    province: {type: String, default: ""},
    city: {type: String, default: ""},
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    fans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    muteNotice: {type: Boolean, default: false},
    randomNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RandomNote' }],
    hash: {type: String, default: ""},
    salt: {type: String, default: ""},
    user_introduction: {type: String, default: "此人很懒，什么也没有留下..."},
    user_new_introduction: {type: String, default: ""},
    user_introduction_status: { type: Number, default: 0 }, // 默认是0，1是通过审核，2是正在审核，3是审核未通过
    user_introduction_reject_reason: {type: String, default: ''},
    roles: [{ type: String, default: 'Normal' }],
    token: { type: String, default: "" },
    level: { type: Number, default: 0 },
    birthday: { type: Date, default: new Date("01/01/1990") },
    outAt: { type: Date, default: new Date()},
    lastLogin: { type: Number, default: 0 },
    lastMobileLogin: { type: Number, default: 0 },
    lastTabletLogin: { type: Number, default: 0 },
    user_bg_cover: {type: String, default: ""},
    user_new_bg_cover: {type: String, default: ""},
    user_bg_cover_status: { type: Number, default: 0 },
    user_bg_cover_reject_reason: {type: String, default: ''},
    userState: { type: Number, default: 0 }, // 0:普通用户 1:试用会员 2:会员(月) 3:会员(年) 4:会员(终身)
    vipState: { type: Number, default: 0 }, // 0:过期  1:没有过期
    expirationDesc: {type: String, default: ""},  // 到期描述 eg:用户是年会员，描述为: 2022-06-05到期
    login_method: {type: String, default: ""}, // phone, wx, qq
    first_new_user: { type: Boolean, default: false },
    first_new_user_desc: {type: String, default: ""},
    user_points: { type: Number, default: 0 },
    account_status: { type: Number, default: 0 },
    wx_unionid: {type: String, default: ""}, // 微信唯一标识码
    wx_nikename: {type: String, default: ""}, // 微信昵称
    wx_avatar: {type: String, default: ""}, // 微信头像
    wx_bind_state: { type: Boolean, default: false }, // 微信绑定状态 绑定了返回true  没有绑定返回false
    qq_unionid: {type: String, default: ""}, // qq唯一标识码
    qq_nikename: {type: String, default: ""}, // qq昵称
    qq_avatar: {type: String, default: ""}, // qq头像
    qq_bind_state: { type: Boolean, default: false }, // qq绑定状态 绑定了返回true  没有绑定返回false
}, {
    timestamps: true,
    usePushEach: true
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
UserSchema.plugin(mongoosePaginate);

UserSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateUserID = function () {
    this.userID = uuid();
};

UserSchema.methods.generateJWT = function (currentTime, device) {
    const today = new Date(currentTime);
    const exp = new Date(currentTime);
    exp.setDate(today.getDate() + 30);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
        iat: currentTime,
        device: device
    }, secret);
};

UserSchema.methods.toAuthJSON = function () {
    return {
        userID: this._id,
        // userID: this.userID,
        username: this.username,
        phone: this.phone,
        email: this.email,
        token: this.token,
        // books: this.books,
        avatar: this.avatar,
        user_introduction: this.user_introduction,
        roles: this.roles,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};

UserSchema.methods.toProfileJSONFor = function (user) {
    return {
        userID: this._id,
        // userID: this.userID,
        username: this.username,
        avatar: this.avatar || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        gender: this.gender,
        // nickname: this.nickname,
        birthday: this.birthday,
        province: this.province,
        city: this.city,
        user_bg_cover: this.user_bg_cover,
        user_introduction: this.user_introduction,
        roles: this.roles,
        totalBookshelves: this.bookshelves.length,
        totalBooks: this.books.length,
        totalArticles: this.articles.length,
        totalMusic: this.musics.length,
        totalRandomNotes: this.randomNotes.length,
        totalFollowing: this.following.length,
        totalFans: this.fans.length,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

UserSchema.methods.toCollectionJSONFor = function (user) {
    return {
        userID: this._id,
        totalBookshelves: this.bookshelves.length,
        totalBooks: this.books.length,
        totalArticles: this.articles.length,
        totalMusic: this.musics.length,
        totalRandomNotes: this.randomNotes.length,
        totalFollowing: this.following.length,
        totalFans: this.fans.length
    };
};


UserSchema.methods.toSimpleProfileJSONFor = function (user) {
    return {
        userID: this._id,
        // userID: this.userID,
        username: this.username,
        avatar: this.avatar || 'https://static.productionready.io/images/smiley-cyrus.jpg'
        // gender: this.gender,
        // province: this.province,
        // city: this.city,
        // user_introduction: this.user_introduction,
        // roles: this.roles
    };
};

UserSchema.methods.toReviewJSONFor = function (user) {
    return {
        userID: this._id,
        // userID: this.userID,
        username: this.username,
        nickname: this.nickname,
        nickname_status: this.nickname_status,
        nickname_reject_reason: this.nickname_reject_reason,
        avatar: this.avatar || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        avatar_new_path: this.avatar_new_path,
        avatar_status: this.avatar_status,
        avatar_reject_reason: this.avatar_reject_reason,
        user_introduction: this.user_introduction,
        user_new_introduction: this.user_new_introduction,
        user_introduction_status: this.user_introduction_status,
        user_introduction_reject_reason: this.user_introduction_reject_reason,
        user_bg_cover: this.user_bg_cover,
        user_new_bg_cover: this.user_new_bg_cover,
        user_bg_cover_status: this.user_bg_cover_status,
        user_bg_cover_reject_reason: this.user_bg_cover_reject_reason
    };
};

UserSchema.methods.toJSONFor = function (user) {
    return {
        userID: this._id,
        username: this.username,
        email: this.email,
        phone: this.phone,
        avatar: this.avatar,
        avatar_new_path: this.avatar_new_path,
        avatar_status: this.avatar_status,
        avatar_reject_reason: this.avatar_reject_reason,
        gender: this.gender,
        nickname: this.nickname,
        nickname_status: this.nickname_status,
        nickname_reject_reason: this.nickname_reject_reason,
        province: this.province,
        city: this.city,
        muteNotice: this.muteNotice,
        user_introduction: this.user_introduction,
        user_new_introduction: this.user_new_introduction,
        user_introduction_status: this.user_introduction_status,
        user_introduction_reject_reason: this.user_introduction_reject_reason,
        token: this.token,
        birthday: this.birthday,
        lastLogin: this.lastLogin,
        lastMobileLogin: this.lastMobileLogin,
        lastTabletLogin: this.lastTabletLogin,
        user_bg_cover: this.user_bg_cover,
        user_new_bg_cover: this.user_new_bg_cover,
        user_bg_cover_status:this.user_bg_cover_status,
        user_bg_cover_reject_reason: this.user_bg_cover_reject_reason,
        userState: this.userState, // 0:普通用户 1:试用会员 2:会员(月) 3:会员(年) 4:会员(终身)
        vipState: this.vipState, // 0:过期  1:没有过期
        expirationDesc: this.expirationDesc,  // 到期描述 eg:用户是年会员，描述为: 2022-06-05到期
        login_method: this.login_method, // phone, wx, qq
        first_new_user: this.first_new_user,
        first_new_user_desc: this.first_new_user_desc,
        user_points: this.user_points,
        // wx_unionid: this.wx_unionid, // 微信唯一标识码
        wx_nikename: this.wx_nikename, // 微信昵称
        wx_avatar:this.wx_avatar, // 微信头像
        wx_bind_state: this.wx_bind_state, // 微信绑定状态 绑定了返回true  没有绑定返回false
        // qq_unionid: this.qq_unionid, // qq唯一标识码
        qq_nikename: this.qq_nikename, // qq昵称
        qq_avatar: this.qq_avatar, // qq头像
        qq_bind_state: this.qq_bind_state, // qq绑定状态 绑定了返回true  没有绑定返回false
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

mongoose.model('User', UserSchema);
