const router = require('express').Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const User = mongoose.model('User');
const Tag = mongoose.model('Tag');
const CoverPath = mongoose.model('CoverPath');
const ArticleCategory = mongoose.model('ArticleCategory')
const auth = require('../auth');
const {ObjectID} = require("mongoose/lib/schema");

// Preload article objects on routes with ':article'
router.param('article', function (req, res, next, article) {
    Article.findOne({_id: article})
        .populate([{path:'user', populate:['fans']}, 'tagList', 'likedUserList', 'collectedUserList', 'coverList', 'category'])
        .then(function (article) {
            if (!article) {
                return res.json({
                    code: 0,
                    desc: '文章不存在'
                });
            }
            req.article = article;
            return next();
        }).catch(next);
});

router.param('tag', function (req, res, next, tag) {
    Tag.findOne({_id: tag})
        .populate({path: 'article', populate: ["user", "category"]})
        .then(function (tag) {
            if (!tag) {
                return res.json({
                    code: 0,
                    desc: '标签不存在'
                });
            }
            req.tag = tag;
            return next();
        }).catch(next);
});

router.param('category', function (req, res, next, category) {
    ArticleCategory.findOne({_id: category}).populate("parentCategory")
        .then(function (category) {
            if (!category) {
                return res.json({
                    code: 0,
                    desc: '文章分类不存在'
                });
            }
            req.category = category;
            return next();
        }).catch(next);
});

router.post("/categories", auth.required, function (req, res, next) {
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
        if (user.roles.indexOf('admin') === -1) {
            return res.json({
                code: 0,
                desc: '请使用管理员账号登录'
            });
        }

        const articleCategory = new ArticleCategory(req.body.articleCategory);
        return articleCategory.save().then(function () {
            return res.json({
                code: 1,
                desc: '成功'
            });
        });
    }).catch(next);
});

router.get("/categories", auth.required, function (req, res, next) {
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
        return ArticleCategory.find({parentCategory: null}).then(function (categories) {
            return Promise.all(categories.map(async (c) => {
                const list = await ArticleCategory.find({parentCategory: new mongoose.Types.ObjectId(c._id)});
                c.children = list || [];
                return c;
            })).then((categories) => {
                return res.json({
                    code: 1,
                    desc: '成功',
                    data: categories.map((c) => c.toJSONFor())
                });
            });
        });
    }).catch(next);
});


// return all article
router.get('/all/:category', auth.required, function (req, res, next) {
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

        const query = {
            category: req.category
        };

        if (req.body.status) {
            query.status = req.query.status
        }

        const query2 = {
            ...query,
        };
        if (typeof req.body.updatedAt !== "undefined") {
            query2.createdAt = {$lt: req.query.updatedAt};
        }
        Article.count(query, function (err, count) {
            return Article.find(query2).sort({createdAt: -1}).limit(parseInt(req.query.pageSize) || 10)
                .populate(['user', 'tagList', 'coverList', 'likedUserList', 'collectedUserList', 'category'])
                .then(function(result) {
                    return res.json({
                        code: 1,
                        desc: '成功',
                        data: result ? result.map(function (article) {
                            return article.toJSONFor();
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

router.get('/hot', auth.required, function (req, res, next) {
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

        const query = {
        };

        const query2 = {
            ...query,
        };

        if (typeof req.query.rank !== "undefined") {
            query2.rank = {$gt: req.query.rank};
        }

            return Article.find(query2).sort({rank: 1}).limit(parseInt(req.query.pageSize) || 3)
            .then(function(result) {
                return res.json({
                    code: 1,
                    desc: '成功',
                    data: result ? result.map(function (article) {
                        return {
                            articleID: article._id,
                            title: article.title
                        };
                    }) : []
                });
        });
    }).catch(next);
});

router.get('/recommend', auth.required, function (req, res, next) {
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

        const query = {
            status: 0
        };

        const query2 = {
            ...query,
        };

        if (typeof req.query.rank !== "undefined") {
            query2.rank = {$gt: req.query.rank};
        }

        Article.count(query, function (err, count) {
            return Article.find(query2).sort({rank: 1}).limit(parseInt(req.query.pageSize) || 10)
                .populate(['user', 'tagList', 'coverList', 'likedUserList', 'collectedUserList', 'category'])
                .then(function(result) {
                    return res.json({
                        code: 1,
                        desc: '成功',
                        data: result ? result.map(function (article) {
                            return article.toJSONFor();
                        }) : [],
                        paging: {
                            lastTimestamp: (result && result.length > 0) ? result[result.length - 1].rank : undefined,
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

// return a article
router.get('/', auth.required, function (req, res, next) {
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

        const query = {};
        if (req.query.status !== undefined) {
            query['status'] = req.query.status;
        }

        return Article.find(query).sort({"likedCount": -1}).limit(10).then(function (articles) {
            return Promise.all(articles.map((article) => {
                return article.populate(['user', 'tagList', 'coverList', 'likedUserList', 'collectedUserList', 'category']).execPopulate()
            })).then(function (articles) {
                return res.json({
                    code: 1,
                    desc: '成功',
                    data: articles.map((article) => {
                        const existing_liked_user = article.likedUserList.filter((user_) => {
                            return user._id.toString() === user_._id.toString();
                        });
                        console.log(article.user);
                        // const existing_collected_user = article.collectedUserList.filter((user_) => {
                        //     return user._id.toString() === user_._id.toString();
                        // });
                        return {
                            ...article.toJSONFor(),
                            likeStatus: existing_liked_user.length > 0,
                            collectStatus: article.user._id.toString() === req.payload.id.toString()?
                                article.collected: false
                        }
                    })
                });
            });
        });
    }).catch(next);
});

router.post('/', auth.required, function (req, res, next) {
    User.findById(req.payload.id)
        .populate(['articles', 'tagList']).then(function (user) {
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

        const coverList = req.body.article.coverList || [];
        req.body.article.coverList = [];
        const article = new Article(req.body.article);

        const tags = (req.body.article.tags || "").split(",").filter((v, i, _) => {
            return v !== "";
        });

        if (tags.length > 6) {
            return res.json({
                code: 0,
                desc: "标签数目不能超过6个"
            });
        }

        article.user = user;

        return article.save().then(function (article) {
            // console.log(coverList);
            return Promise.all(coverList.map((c, i) => {
                const cover = new CoverPath(c);
                cover.article = article;
                article.coverList = article.coverList.concat([cover]);
                return cover.save();
            })).then(()=>{
                // console.log(article);
                return article.save();
            }).then((article) => {
                return Promise.all(tags.map((v, i, _) => {
                    let t = new Tag({name: v});
                    t.article = article;
                    article.tagList = article.tagList.concat([t]);
                    return t.save();
                })).then(function (results) {
                    article.tagListStr = tags;
                    return article.save().then(function (article) {
                        user.articles = user.articles.concat([article]);
                        return user.save().then(function () {
                            return article.populate(["tagList", "coverList", 'category']).execPopulate().then(function (article) {
                                return res.json({
                                    code: 1,
                                    desc: '成功',
                                    data: article.toJSONFor(user)
                                });
                            });
                        });
                    });
                });
            });
        });
    }).catch(next);
});

// return a article
router.get('/:article', auth.required, function (req, res, next) {
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

        const existing_liked_user = req.article.likedUserList.filter((user_) => {
            return user._id.toString() === user_._id.toString();
        });
        const following = req.article.user.fans.filter(user_ => {
            return user._id.toString() === user_.id.toString();
        });
        const followed = req.article.user.following.filter(user_ => {
            return user._id.toString() === user_.id.toString();
        });
        return res.json({
            code: 1,
            desc: '成功',
            data: {
                ...req.article.toJSONFor(),
                isFollowing: following.length > 0 && followed > 0? 2: following > 0? 1: 0,
                likeStatus: existing_liked_user.length > 0,
                isAuthor: req.article.user._id.toString() === req.payload.id.toString(),
                collectStatus: req.article.user._id.toString() === req.payload.id.toString()?
                req.article.collected: false
            }
        });
    }).catch(next);
});

router.get('/:article/tags', auth.required, function (req, res, next) {
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

        const tags = Array.from(new Set(req.query.tags.split(",")));

        if (tags.length > 6) {
            return res.json({
                code: 0,
                desc: "标签数目不能超过6个"
            });
        }
        // const userTagList = user.tagList.map((v, i, _) => {
        //     return v.name;
        // });
        // const articleTagList = req.article.tagList.map((v, i, _) => {
        //     return v.name;
        // });
        return Promise.all(req.article.tagList.map((v, i, _) => {
            return v.remove();
        })).then(() => {
            req.article.tagList = [];
            return Promise.all(tags.map((v, i, _) => {
                let t = new Tag({name: v});
                t.article = req.article;
                req.article.tagList = req.article.tagList.concat([t]);
                return t.save();
            })).then(() => {
                req.article.tagListStr = req.article.tagList.map((v, i, _) => {
                    return v.name;
                });

                // req.book.user = user;
                return req.article.save().then(function (article) {
                    return article.populate([{path: "tagList"}]).execPopulate().then(function (book) {
                        return res.json({
                            code: 1,
                            desc: '成功',
                            data: article.toJSONFor()
                        });
                    });
                });
            });
        });
    }).catch(next);
});

router.post('/:article/like', auth.required, function (req, res, next) {
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

        const existing_liked_user = req.article.likedUserList.filter((user_) => {
            return user._id.toString() === user_._id.toString();
        });
        if (existing_liked_user.length === 0) {
            req.article.likedUserList = req.article.likedUserList.concat([user]);
            req.article.likedCount += 1;
            return req.article.save().then(function (article) {
                return article.populate([{
                    path: "coverList"
                },{
                    path: "user"
                },{
                    path: "tagList"
                }]).execPopulate().then((article) => {
                    return res.json({
                        code: 1,
                        desc: '点赞成功',
                        data: {
                            // ...article.toJSONFor(),
                            likeStatus: true
                        }
                    });
                });
            })
        } else {
            return res.json({
                code: 0,
                desc: '已经点赞过'
            });
        }
    }).catch(next);
});

router.post('/:article/unlike', auth.required, function (req, res, next) {
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

        const existing_liked_user = req.article.likedUserList.filter((user_) => {
            return user._id.toString() === user_._id.toString();
        });
        if (existing_liked_user.length > 0) {
            req.article.likedUserList.remove(user);
            req.article.likedCount -= 1;
            return req.article.save().then(function (article) {
                return article.populate([{
                    path: "coverList"
                },{
                    path: "user"
                },{
                    path: "tagList"
                }]).execPopulate().then((article) => {
                    res.json({
                        code: 1,
                        desc: '取消点赞成功',
                        data: {
                            // ...article.toJSONFor(),
                            likeStatus: false
                        }
                    });
                });
            })
        } else {
            return res.json({
                code: 0,
                desc: '未点赞过'
            });
        }
    }).catch(next);
});

// update article
router.put('/:article', auth.required, function (req, res, next) {
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

        if (req.article.user._id.toString() === req.payload.id.toString() || user.roles.indexOf('admin') > -1) {
            if (typeof req.body.article.title !== 'undefined') {
                req.article.title = req.body.article.title;
            }

            if (typeof req.body.article.category !== 'undefined') {
                req.article.category = req.body.article.category;
            }

            if (typeof req.body.article.content !== 'undefined') {
                req.article.content = req.body.article.content;
            }

            if (typeof req.body.article.voicePath !== 'undefined') {
                req.article.voicePath = req.body.article.voicePath;
            }

            if (typeof req.body.article.wordCount !== 'undefined') {
                req.article.wordCount = req.body.article.wordCount;
            }

            if (typeof req.body.article.desc !== 'undefined') {
                req.article.desc = req.body.article.desc;
            }

            if (typeof req.body.article.seconds !== 'undefined') {
                req.article.seconds = req.body.article.seconds;
            }

            // if (typeof req.body.article.coverList !== 'undefined') {
            //     coverList = req.body.article.coverList;
            //     req.article.coverList = [];
            // }
            let tags = "";
            if (typeof req.body.article.tags !== 'undefined') {
                tags = Array.from(new Set(req.body.article.tags.split(",")));
                if (tags.length > 6) {
                    return res.json({
                        code: 0,
                        desc: "标签数目不能超过6个"
                    });
                }
                // req.article.tagList = req.body.article.tags.split(',');
            }

            if (typeof req.body.article.status !== 'undefined') {
                req.article.status = req.body.article.status;
            }

            if (typeof req.body.article.tags !== 'undefined') {
                return Promise.all(req.article.tagList.map((v, i, _) => {
                    return v.remove();
                })).then(() => {
                    req.article.tagList = [];
                    return Promise.all(tags.map((v, i, _) => {
                        let t = new Tag({name: v});
                        t.article = req.article;
                        req.article.tagList = req.article.tagList.concat([t]);
                        return t.save();
                    })).then(function (results) {
                        req.article.tagListStr = tags;

                        if (typeof req.body.article.coverList !== 'undefined') {
                            const coverList = req.body.article.coverList;
                            return Promise.all(req.article.coverList.map((v, i, _) => {
                                return v.remove();
                            })).then(() => {
                                req.article.coverList = [];
                                return Promise.all(coverList.map((c, i) => {
                                    const cover = new CoverPath(c);
                                    cover.article = req.article;
                                    req.article.coverList = req.article.coverList.concat([cover]);
                                    return cover.save();
                                })).then((results) => {
                                    return req.article.save().then(function (article) {
                                        return article.populate(['category']).execPopulate().then(article => {
                                            return res.json({
                                                code: 1,
                                                desc: '成功',
                                                data: article.toJSONFor(user)
                                            });
                                        });
                                    });
                                })
                            });
                        } else {
                            return req.article.save().then(function (article) {
                                return article.populate(['category']).execPopulate().then(article => {
                                    return res.json({
                                        code: 1,
                                        desc: '成功',
                                        data: article.toJSONFor(user)
                                    });
                                });
                            });
                        }
                    });
                })
            } else {
                if (typeof req.body.article.coverList !== 'undefined') {
                    const coverList = req.body.article.coverList;
                    return Promise.all(req.article.coverList.map((v, i, _) => {
                        return v.remove();
                    })).then(() => {
                        req.article.coverList = [];
                        return Promise.all(coverList.map((c, i) => {
                            const cover = new CoverPath(c);
                            cover.article = req.article;
                            req.article.coverList = req.article.coverList.concat([cover]);
                            return cover.save();
                        })).then((results) => {
                            return req.article.save().then(function (article) {
                                return article.populate(['category']).execPopulate().then(article => {
                                    return res.json({
                                        code: 1,
                                        desc: '成功',
                                        data: article.toJSONFor(user)
                                    });
                                });
                            });
                        })
                    });
                } else {
                    return req.article.save().then(function (article) {
                        return article.populate(['category']).execPopulate().then(article => {
                            return res.json({
                                code: 1,
                                desc: '成功',
                                data: article.toJSONFor(user)
                            });
                        });
                    });
                }
            }
        } else {
            return res.json({
                code: 0,
                desc: '访问未授权'
            });
        }
    }).catch(next);
});

router.delete('/:article/tags/:tag', auth.required, function (req, res, next) {
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

        if (req.tag.article.user._id.toString() === req.payload.id.toString()) {
            let index = -1;
            for (let i = 0; i < req.article.tagList.length; i++) {
                if (req.article.tagList[i]._id.toString() === req.tag._id.toString()) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                req.article.tagList.splice(index, 1);
            }
            req.article.tagListStr = req.article.tagList.map((v, i, _) => {
                return v.name;
            });
            return Promise.all([
                req.article.save(),
                req.tag.remove()
            ]).then(function () {
                return res.json({
                    code: 1,
                    desc: '成功'
                });
            })
        } else {
            return res.json({
                code: 0,
                desc: '访问未授权'
            });
        }
    }).catch(next);
});

router.delete('/', auth.required, function (req, res, next) {
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

        const article_ids = req.body.articles.split(",");
        Promise.all(article_ids.map((id) => {
            Article.findOne({_id: id, user: user}).then(function (article) {
                if (article) {
                    return article.remove();
                }
                return null;
            });
        })).then(function () {
            return res.json({
                code: 1,
                desc: '成功'
            });
        });
    }).catch(next);
});

router.delete('/:article', auth.required, function (req, res, next) {
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

        if (req.article.user._id.toString() === req.payload.id.toString()) {
            if ([2, 3, 4].indexOf(req.article.status) > -1) {
                // 未通过审核、草稿箱、回收站，直接删除
                return Promise.all(req.article.tagList.map((t) => {
                    return t.remove();
                })).then(() => {
                    return Promise.all(req.article.coverList.map((c) => {
                        return c.remove()
                    })).then(() => {
                        return req.article.remove().then(() => {
                            return res.json({
                                code: 1,
                                desc: '成功'
                            });
                        })
                    })
                })
            } else {
                req.article.status = 4;
                req.article.trashDate = new Date();
                return req.article.save().then(() => {
                    return res.json({
                        code: 1,
                        desc: '成功'
                    });
                });
            }
        } else {
            return res.json({
                code: 0,
                desc: '访问未授权'
            });
        }
    }).catch(next);
});

module.exports = router;
