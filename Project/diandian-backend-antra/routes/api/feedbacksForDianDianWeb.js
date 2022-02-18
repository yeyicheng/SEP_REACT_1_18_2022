const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const FeedbackForDianDianWeb = mongoose.model('FeedbackForDianDianWeb');
const auth = require('../auth');

// Preload article objects on routes with ':article'
router.param('feedbackForDianDianWeb', function (req, res, next, feedbackForDianDianWeb) {
    FeedbackForDianDianWeb.findOne({_id: feedbackForDianDianWeb})
        .then(function (feedbackForDianDianWeb) {
            if (!feedbackForDianDianWeb) {
                return res.json({
                    code: 0,
                    desc: '反馈建议不存在'
                });
            }
            req.feedbackForDianDianWeb = feedbackForDianDianWeb;
            return next();
        }).catch(next);
});

// return a article
router.get('/', auth.required, function (req, res, next) {
    const query = {
        // user: req.payload.id
    };

    const query2 = {
        ...query,
    };

    if (typeof req.query.updatedAt !== "undefined") {
        query2.createdAt = {$lt: req.query.updatedAt};
    }

    return FeedbackForDianDianWeb.count(query, function (err, count) {
        return FeedbackForDianDianWeb.find(query2).sort({createdAt: -1}).limit(parseInt(req.query.pageSize) || 10)
            .then(function (result) {
                return res.json({
                    code: 1,
                    desc: '成功',
                    data: result ? result.map(function (feedbackForDianDianWeb) {
                        return feedbackForDianDianWeb.toJSONFor()
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
    }).catch(next);
});

router.get('/:feedbackForDianDianWeb', auth.required, function (req, res, next) {
    return res.json({
        code: 1,
        desc: '成功',
        data: req.feedbackForDianDianWeb.toJSONFor()
    })
});


router.post('/', function (req, res, next) {
    const feedbackForDianDianWeb = new FeedbackForDianDianWeb(req.body.feedback);
    return feedbackForDianDianWeb.save().then(function (feedbackForDianDianWeb) {
        return res.json({
            code: 1,
            desc: '成功',
            data: feedbackForDianDianWeb.toJSONFor()
        });
    }).catch(next);
});

router.delete('/:feedbackForDianDianWeb', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) {
            return res.json({
                code: -4,
                desc: '用户不存在，请重新登录'
            });
        }
        if (user.roles.indexOf('admin') > -1) {
            return req.feedbackForDianDianWeb.remove().then(function () {
                res.json({
                    code: 1,
                    desc: '成功',
                })
            });
        } else {
            res.json({
                code: 0,
                desc: '访问未授权'
            });
        }
    }).catch(next);
});

module.exports = router;
