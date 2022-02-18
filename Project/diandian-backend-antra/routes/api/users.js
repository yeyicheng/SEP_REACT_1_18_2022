const http = require("http");
const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const Article = mongoose.model('Article');
const auth = require('../auth');
const dateFormat = require('dateformat');

router.param('user', function (req, res, next, user) {
    User.findOne({_id: user})
        .populate(['following', 'fans'])
        .then(function (user) {
            if (!user) {
                return res.json({
                    code: 0,
                    desc: '用户不存在'
                });
            }
            req.user = user;
            return next();
        }).catch(next);
});


router.get('/users', auth.required, function (req, res, next) {
    User.findById(req.payload.id)
        .populate(['bookshelves', 'books', 'articles', 'musics', 'following', 'fans'])
        .then(function (user) {
            if (!user) {
                return res.json({
                    code: -4,
                    desc: '用户不存在，请重新登录'
                });
            }
            if ((req.payload.device === 'tablet' && user.lastTabletLogin > req.payload.iat) || (req.payload.device === 'mobile' && user.lastMobileLogin > req.payload.iat)) {
                return res.json({
                    code: -4,
                    desc: '登录已过期，请重新登录'
                });
            }
            if (user.roles.indexOf('admin') === -1) {
                return res.json({
                    code: 0,
                    desc: '请使用管理员账号登录'
                });
            }

            return User.find({username: {$regex: new RegExp(req.query.q)}}).then((users) => {
                return res.json({
                    code: 1,
                    desc: '成功',
                    data: users.map((u) => u.toSimpleProfileJSONFor())
                });
            })
        }).catch(next);
});


router.get('/user', auth.required, function (req, res, next) {
    User.findById(req.payload.id)
        .populate(['bookshelves', 'books', 'articles', 'musics', 'following', 'fans'])
        .then(function (user) {
            if (!user) {
                return res.json({
                    code: -4,
                    desc: '用户不存在，请重新登录'
                });
            }
            if ((req.payload.device === 'tablet' && user.lastTabletLogin > req.payload.iat) || (req.payload.device === 'mobile' && user.lastMobileLogin > req.payload.iat)) {
                return res.json({
                    code: -4,
                    desc: '登录已过期，请重新登录'
                });
            }
            return res.json({
                code: 1,
                desc: '成功',
                data: user.toProfileJSONFor()
            });
        }).catch(next);
});

router.get('/user/articles', auth.required, function (req, res, next) {
    User.findById(req.payload.id)
        .then(function (user) {
            if (!user) {
                return res.json({
                    code: -4,
                    desc: '用户不存在，请重新登录'
                });
            }
            if ((req.payload.device === 'tablet' && user.lastTabletLogin > req.payload.iat) || (req.payload.device === 'mobile' && user.lastMobileLogin > req.payload.iat)) {
                return res.json({
                    code: -4,
                    desc: '登录已过期，请重新登录'
                });
            }
            const options = {
                page: req.query.page || 1,
                limit: req.query.pageSize || 10,
                populate: [{
                    path: 'user',
                    populate: [{
                        path: 'bookshelves'
                    }, {
                        path: 'books'
                    }, {
                        path: 'articles'
                    }]
                }, {path: 'tagList'}],
                sort: {updatedAt: -1},
            };

            const query = {
                user: req.payload.id
            };

            if (typeof req.query.title !== "undefined") {
                query.name = {$regex: new RegExp(req.query.title)};
            }

            if (typeof req.query.tags !== "undefined") {
                query.tagListStr = {$all: req.query.tags.split(',')};
            }

            if (typeof req.query.status !== "undefined") {
                query.status = req.query.status;
            }

            const query2 = {
                ...query,
            };

            if (typeof req.query.updatedAt !== "undefined") {
                query2.createdAt = {$lt: req.query.updatedAt};
            }

            return Article.count(query, function (err, count) {
                return Article.find(query2).sort({createdAt: -1}).limit(parseInt(req.query.pageSize) || 10)
                    .populate(['user', 'tagList', 'likedUserList', 'collectedUserList', 'coverList', 'category']).then(function (result) {
                        return res.json({
                            code: 1,
                            desc: '成功',
                            data: result ? result.map(function (article) {
                                const existing_liked_user = article.likedUserList.filter((user_) => {
                                    return user._id.toString() === user_._id.toString();
                                });
                                // const existing_collected_user = article.collectedUserList.filter((user_) => {
                                //     return user._id.toString() === user_._id.toString();
                                // });
                                return {
                                    ...article.toJSONFor(article.user),
                                    likeStatus: existing_liked_user.length > 0,
                                    collectStatus: article.collected
                                };
                            }) : [],
                            paging: {
                                lastTimestamp: (result && result.length > 0) ? result[result.length - 1].createdAt : undefined,
                                pageSize: parseInt(req.query.pageSize || 10),
                                // totalPages: result.totalPages,
                                totalCount: count,
                                // hasNextPage: result.hasNextPage
                            }
                        });
                    });
            });
        }).catch(next);
});

router.put('/user', auth.required, function (req, res, next) {
    User.findById(req.payload.id)
        .then(function (user) {
            if (!user) {
                return res.json({
                    code: -4,
                    desc: '用户不存在，请重新登录'
                });
            }
            if ((req.payload.device === 'tablet' && user.lastTabletLogin > req.payload.iat) || (req.payload.device === 'mobile' && user.lastMobileLogin > req.payload.iat)) {
                return res.json({
                    code: -4,
                    desc: '登录已过期，请重新登录'
                });
            }
            // only update fields that were actually passed...
            if (typeof req.body.user.username !== 'undefined') {
                user.username = req.body.user.username;
            }
            if (typeof req.body.user.nickname !== 'undefined') {
                user.nickname = req.body.user.nickname;
                user.nickname_status = 2;
            }
            if (typeof req.body.user.gender !== 'undefined') {
                user.gender = req.body.user.gender;
            }
            if (typeof req.body.user.birthday !== 'undefined') {
                user.birthday = req.body.user.birthday;
            }
            if (typeof req.body.user.user_new_introduction !== 'undefined') {
                user.user_new_introduction = req.body.user.user_new_introduction;
                user.user_introduction_status = 2;
            }
            if (typeof req.body.user.user_new_bg_cover !== 'undefined') {
                user.user_new_bg_cover = req.body.user.user_new_bg_cover;
                user.user_bg_cover_status = 2;
            }
            if (typeof req.body.user.email !== 'undefined') {
                user.email = req.body.user.email;
            }
            if (typeof req.body.user.phone !== 'undefined') {
                user.phone = req.body.user.phone;
            }
            if (typeof req.body.user.avatar_new_path !== 'undefined') {
                user.avatar_new_path = req.body.user.avatar_new_path;
                user.avatar_status = 2;
            }
            if (typeof req.body.user.password !== 'undefined') {
                user.setPassword(req.body.user.password);
            }
            if (typeof req.body.user.province !== 'undefined') {
                user.province = req.body.user.province;
            }
            if (typeof req.body.user.city !== 'undefined') {
                user.city = req.body.user.city;
            }
            if (typeof req.body.user.muteNotice !== 'undefined') {
                user.muteNotice = req.body.user.muteNotice;
            }

            return user.save().then(function () {
                return res.json({
                    code: 1,
                    desc: '成功',
                    data: user.toJSONFor()
                });
            });
        }).catch(next);
});

router.post('/users/login', function (req, res, next) {
    if (!req.body.user.phone) {
        return res.json({
            code: 0,
            desc: '失败',
            errors: {phone: "can't be blank"}
        });
    }

    if (!req.body.user.zone) {
        return res.json({
            code: 0,
            desc: '失败',
            errors: {zone: "can't be blank"}
        });
    }

    if (!req.body.user.code) {
        return res.json({
            code: 0,
            desc: '失败',
            errors: {code: "can't be blank"}
        });
    }

    // async function to make http request
    async function makeSynchronousRequest(data, opt) {
        try {
            let http_promise = getPromise(data, opt);
            let response_body = await http_promise;

            // holds response from server that is passed when Promise is resolved
            return res.json({
                code: 1,
                desc: "成功",
                data: response_body
            });
        } catch (error) {
            // Promise rejected
            return res.json({
                code: 0,
                desc: '验证失败',
                data: error
            });
        }
    }

    let body = "";
    function getPromise(data, opt) {
        return new Promise((resolve, reject) => {
            const req2 = http.request(opt, function (res) {
                console.log("response: " + res.statusCode);
                res.on('data', function (data2) {
                    body += data2;
                }).on('end', function () {
                    const res = JSON.parse(body);
                    if (res.status === 200) {
                        return User.findOne({phone: req.body.user.phone}).then(async user => {
                            if (user) {
                                const currentTime = new Date().getTime();
                                let device;
                                if (req.body.user.device === 'pad' || req.body.user.device === 'ipad') {
                                    device = "tablet";
                                } else if (req.body.user.device === 'android' || req.body.user.device === 'ios') {
                                    device = "mobile";
                                }
                                user.token = user.generateJWT(currentTime, device);
                                if (req.body.user.device !== 'admin') {
                                    if (device === 'tablet') {
                                        user.lastTabletLogin = currentTime;
                                    } else if  (device === 'mobile') {
                                        user.lastMobileLogin = currentTime;
                                    }
                                    user.lastLogin = currentTime;
                                    await user.save();
                                }
                                resolve(user.toJSONFor());
                            } else {
                                reject('用户不存在');
                            }
                        });
                    } else {
                        console.log(res);
                        reject(res);
                    }
                });
            }).on('error', function (e) {
                console.log("error: " + e.message);
            });
            console.log(data);
            req2.write(data);
            req2.end();
        });
    }

    return (async function () {
        const host = "webapi.sms.mob.com";
        const url = "/sms/verify";
        let data_temp = {
            "appkey": "m3496ee1e35f7a",
            "phone": req.body.user.phone,
            "zone": req.body.user.zone,
            "code": req.body.user.code
        }

        // data = JSON.stringify(data);
        const data = `appkey=${data_temp['appkey']}&phone=${data_temp['phone']}&zone=${data_temp['zone']}&code=${data_temp['code']}`;

        let opt = {
            host: host,
            port: '80',
            method: 'POST',
            path: url,
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Content-Length": data.length
            }
        };
        // wait to http request to finish
        return await makeSynchronousRequest(data, opt);
    })();
});

router.post('/users/login-pwd', function (req, res, next) {
    if (!req.body.user.phone) {
        return res.json({
            code: 0,
            desc: '失败',
            errors: {phone: "can't be blank"}
        });
    }
    if (!req.body.user.password) {
        return res.json({
            code: 0,
            desc: '失败',
            errors: {password: "can't be blank"}
        });
    }
    return passport.authenticate('local', {session: false}, async function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            const currentTime = new Date().getTime();
            user.token = user.generateJWT(currentTime);
            if (req.body.user.device !== 'admin') {
                const currentTime = new Date().getTime();
                let device;
                if (req.body.user.device === 'pad' || req.body.user.device === 'ipad') {
                    device = "tablet";
                } else if (req.body.user.device === 'android' || req.body.user.device === 'ios') {
                    device = "mobile";
                }
                user.token = user.generateJWT(currentTime, device);
                if (device === 'tablet') {
                    user.lastTabletLogin = currentTime;
                } else if  (device === 'mobile') {
                    user.lastMobileLogin = currentTime;
                }
                user.lastLogin = currentTime;
                await user.save();
            }
            return res.json({
                code: 1,
                desc: '成功',
                data: user.toJSONFor()
            });
        } else {
            return res.json({
                code: 0,
                desc: '登录失败',
                ...info
            });
        }
    })(req, res, next)
});

router.get('/wechat', passport.authenticate('wechat', {}, (req, res) => {
}));

router.get('/wechat/oauth-callback', function (req, res, next) {
    passport.authenticate('wechat', {}, function (err, profile) {
        if (err) {
            return next(err);
        }
        User.findOne({wx_unionid: profile.unionid}).then((user) => {
            if (user) {
                user.token = user.generateJWT();
                return res.json({
                    code: 1,
                    desc: '微信登录成功',
                    data: user.toAuthJSON()
                });
            } else {
                return res.json({
                    code: 1,
                    desc: '微信授权成功',
                    data: profile
                })
            }
        })
    })(req, res, next);
});

router.get('/qq',
    passport.authenticate('qq',
        {},
        (req, res) => {
        }), (req, res) => {
        // The request will be redirected to qq for authentication, so this
        // function will not be called.
    });

router.get('/auth/qq/oauth-callback', function (req, res, next) {
    passport.authenticate('qq', {}),
        function (err, profile) {
            // Successful authentication, redirect home.
            User.findOne({qq_unionid: profile.id}).then((user) => {
                if (user) {
                    user.token = user.generateJWT();
                    return res.json({
                        code: 1,
                        desc: 'qq登录成功',
                        data: user.toAuthJSON()
                    });
                } else {
                    return res.json({
                        code: 1,
                        desc: 'qq授权成功',
                        data: profile
                    })
                }
            })
        }(req, res, next);
});

router.post('/bind', auth.required, function (req, res, next) {
    User.findById(req.payload.id)
        .then(function (user) {
            if (!user) {
                return res.json({
                    code: -4,
                    desc: '用户不存在，请重新登录'
                });
            }
            if (req.body.bind.type === 'wx') {
                user.wx_unionid = req.body.bind.wx_unionid;
            } else if (req.body.bind.type === 'qq') {
                user.qq_unionid = req.body.bind.qq_unionid;
            } else if (req.body.bind.type === 'phone') {
                user.phone = req.body.bind.phone;
            }
            return user.save().then((user) => {
                return res.json({
                    code: 1,
                    desc: '绑定成功'
                })
            });
        }).catch(next);
});

router.post('/users', function (req, res, next) {
    return User.findOne({phone: req.body.user.phone}).then((user) => {
        if (!user) {
            const newUserAccount = new User(req.body.user);
            // newUserAccount.username = req.body.user.username;
            // newUserAccount.email = req.body.user.email;
            // newUserAccount.phone = req.body.user.phone;
            // newUserAccount.avatar = req.body.user.avatar;
            // newUserAccount.gender = req.body.user.gender;
            // newUserAccount.roles = req.body.user.roles;
            // newUserAccount.books = [];
            // newUserAccount.province = req.body.user.province;
            // newUserAccount.city = req.body.user.city;
            newUserAccount.setPassword(req.body.user.password);
            newUserAccount.generateUserID();

            return newUserAccount.save().then(() => {
                return res.json({
                    code: 1,
                    desc: "手机号注册成功"
                })
            })
        } else {
            return res.json({
                code: 0,
                desc: "手机号已经存在，请登录"
            })
        }
    }).catch(next);
});

router.get('/user/articleTags', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) {
            return res.json({
                code: -4,
                desc: '用户不存在，请重新登录'
            });
        }
        if ((req.payload.device === 'tablet' && user.lastTabletLogin > req.payload.iat) || (req.payload.device === 'mobile' && user.lastMobileLogin > req.payload.iat)) {
            return res.json({
                code: -4,
                desc: '登录已过期，请重新登录'
            });
        }

        return user.populate({
            path: 'articles',
            populate: {
                path: 'tagList'
            }
        }).execPopulate().then(function (user) {
            let tagSet = new Set();
            let tagArr = [];
            user.articles.forEach(article => {
                article.tagList.forEach(tag => {
                    if (!tagSet.has(tag.name)) {
                        tagArr.push(tag);
                        tagSet.add(tag.name);
                    }
                    return tag;
                });
            });
            return res.json({
                code: 1,
                desc: '成功',
                data: tagArr.map(t => {
                    return {id: t._id.toString(), name: t.name};
                })
            });
        })
    }).catch(next);
});

router.get('/user/articleCounts', auth.required, function (req, res, next) {
    User.findById(req.payload.id)
        .then(function (user) {
            if (!user) {
                return res.json({
                    code: -4,
                    desc: '用户不存在，请重新登录'
                });
            }
            if ((req.payload.device === 'tablet' && user.lastTabletLogin > req.payload.iat) || (req.payload.device === 'mobile' && user.lastMobileLogin > req.payload.iat)) {
                return res.json({
                    code: -4,
                    desc: '登录已过期，请重新登录'
                });
            }
            return Article.aggregate([
                {
                    $facet: {
                        "inReview": [
                            {
                                "$match": {
                                    $and: [{
                                        "user": new mongoose.Types.ObjectId(user._id)
                                    }, {
                                        "status": 0
                                    }]
                                }
                            },
                            {"$count": "inReview"}
                        ],
                        "published": [
                            {
                                "$match": {
                                    $and: [{
                                        "user": new mongoose.Types.ObjectId(user._id)
                                    }, {
                                        "status": 1
                                    }]
                                }
                            },
                            {"$count": "published"}
                        ],
                        "rejected": [
                            {
                                "$match": {
                                    $and: [{
                                        "user": new mongoose.Types.ObjectId(user._id)
                                    }, {
                                        "status": 2
                                    }]
                                }
                            },
                            {"$count": "rejected"}
                        ],
                        "draft": [
                            {
                                "$match": {
                                    $and: [{
                                        "user": new mongoose.Types.ObjectId(user._id)
                                    }, {
                                        "status": 3
                                    }]
                                }
                            },
                            {"$count": "draft"}
                        ],
                        "trash": [
                            {
                                "$match": {
                                    $and: [{
                                        "user": new mongoose.Types.ObjectId(user._id)
                                    }, {
                                        "status": 4
                                    }]
                                }
                            },
                            {"$count": "trash"}
                        ],
                        "privateMode": [
                            {
                                "$match": {
                                    $and: [{
                                        "user": new mongoose.Types.ObjectId(user._id)
                                    }, {
                                        "status": 5
                                    }]
                                }
                            },
                            {"$count": "privateMode"}
                        ],
                        "off": [
                            {
                                "$match": {
                                    $and: [{
                                        "user": new mongoose.Types.ObjectId(user._id)
                                    }, {
                                        "status": 6
                                    }]
                                }
                            },
                            {"$count": "off"}
                        ]
                    }
                }]).exec().then((result) => {
                console.log(result)
                return res.json({
                    code: 1,
                    desc: '成功',
                    data: {
                        "inReview": result[0]["inReview"].length > 0 ? result[0]["inReview"][0]["inReview"] : 0,
                        "published": result[0]["published"].length > 0 ? result[0]["published"][0]["published"] : 0,
                        "rejected": result[0]["rejected"].length > 0 ? result[0]["rejected"][0]["rejected"] : 0,
                        "draft": result[0]["draft"].length > 0 ? result[0]["draft"][0]["draft"] : 0,
                        "trash": result[0]["trash"].length > 0 ? result[0]["trash"][0]["trash"] : 0,
                        "privateMode": result[0]["privateMode"].length > 0 ? result[0]["private"][0]["private"] : 0,
                        "off": result[0]["off"].length > 0 ? result[0]["off"][0]["off"] : 0,
                    }
                })
            })
        }).catch(next);
});

router.get('/user/recommends', auth.required, function (req, res, next) {
    User.findById(req.payload.id)
        .then(function (user) {
            if (!user) {
                return res.json({
                    code: -4,
                    desc: '用户不存在，请重新登录'
                });
            }
            if ((req.payload.device === 'tablet' && user.lastTabletLogin > req.payload.iat) || (req.payload.device === 'mobile' && user.lastMobileLogin > req.payload.iat)) {
                return res.json({
                    code: -4,
                    desc: '登录已过期，请重新登录'
                });
            }
            const options = {
                page: req.query.page || 1,
                limit: req.query.pageSize || 10,
                populate: [{
                    path: 'book',
                    populate: [{
                        path: 'tagList'
                    }, {
                        path: "catalogs"
                    }]
                }, {
                    path: 'user'
                }, {
                    path: "likedUserList"
                }],
                sort: {updatedAt: -1},
            };

            const query = {
                user: req.query.userId
            };

            const query2 = {
                ...query,
            };

            if (typeof req.query.updatedAt !== "undefined") {
                query2.createdAt = {$lt: req.query.updatedAt};
            }

            return Recommend.count(query, function (err, count) {
                return Recommend.find(query2).sort({createdAt: -1}).limit(parseInt(req.query.pageSize) || 10)
                    .populate([{
                        path: 'book',
                        populate: [{
                            path: 'tagList'
                        }, {
                            path: "catalogs"
                        }]
                    }, {
                        path: 'user'
                    }, {
                        path: "likedUserList"
                    }]).then(function (result) {
                        return res.json({
                            code: 1,
                            desc: '成功',
                            data: result ? result.map(function (recommend) {
                                const existing_liked_user = recommend.likedUserList.filter((user_) => {
                                    return user._id.toString() === user_._id.toString();
                                });
                                return {
                                    ...recommend.toJSONFor(),
                                    liked: existing_liked_user.length > 0
                                };
                            }) : [],
                            paging: {
                                lastTimestamp: (result && result.length > 0) ? result[result.length - 1].createdAt : undefined,
                                pageSize: parseInt(req.query.pageSize || 10),
                                // totalPages: result.totalPages,
                                totalCount: count,
                                // hasNextPage: result.hasNextPage
                            }
                        });
                    });
            });
        }).catch(next);
});

module.exports = router;
