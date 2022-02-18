const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// var uniqueValidator = require('mongoose-unique-validator');
// var slug = require('slug');
// var User = mongoose.model('User');

const ArticleSchema = new mongoose.Schema({
    title: {type: String, default: ""},
    content: {type: String, default: ""},
    // tagList: [{type: String}],
    status: {type: Number, default: 0},
    tagList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    tagListStr: [{type: String}],
    coverList: [{type: mongoose.Schema.Types.ObjectId, ref: 'CoverPath'}],
    voicePath: {type: String, default: ""},
    seconds: {type: Number, default: 0},
    wordCount: {type: Number, default: 0},
    desc: {type: String, default: ""},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    likedUserList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    likedCount: {type: Number, default: 0},
    collected: {type: Boolean, default: false},
    rank: {type: Number, default: Number.MAX_SAFE_INTEGER},
    trashDate: Date,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ArticleComment' }],
    commentCount: {type: Number, default: 0},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'ArticleCategory'},
    starCommentCount: {type: Number, default: 0}
}, {timestamps: true});

ArticleSchema.plugin(mongoosePaginate);


// NoteSchema.plugin(uniqueValidator, {message: 'is already taken'});

// BookSchema.pre('validate', function(next){
//   if(!this.slug)  {
//     this.slugify();
//   }
//
//   next();
// });

// BookSchema.methods.slugify = function() {
//   this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
// };

// BookSchema.methods.updateFavoriteCount = function() {
//   var article = this;
//
//   return User.count({favorites: {$in: [article._id]}}).then(function(count){
//     article.favoritesCount = count;
//
//     return article.save();
//   });
// };

ArticleSchema.methods.toJSONFor = function (user) {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        status: this.status,
        desc: this.desc,
        user: this.user.toSimpleProfileJSONFor(),
        coverList: this.coverList? this.coverList.map(v=>{
            return v.toJSONFor();
        }): undefined,
        likedCount: this.likedCount,
        collectedCount: this.collectedCount,
        voicePath: this.voicePath,
        seconds: this.seconds,
        wordCount: this.wordCount,
        tagList: this.tagList? this.tagList.map((v, i, _) => {
            return v.toJSONFor();
            }): undefined,
        tagListStr: this.tagListStr,
        rank: this.rank,
        trashDate: this.trashDate,
        topCommentCount: (this.comments || []).length,
        commentNumber: this.commentCount,
        starCommentCount: this.starCommentCount,
        category: this.category? this.category.toSimpleJSONFor(): null,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

ArticleSchema.methods.toSimpleJSONFor = function (user) {
    return {
        id: this._id,
        title: this.title,
        status: this.status,
        rank: this.rank,
        user: this.user.toSimpleProfileJSONFor(user),
        trashDate: this.trashDate,
        coverList: this.coverList? this.coverList.map(v=>{
            return v.toJSONFor();
        }): undefined,
        tagList: this.tagList? this.tagList.map((v, i, _) => {
            return v.toJSONFor();
        }): undefined,
        tagListStr: this.tagListStr,
        topCommentCount: (this.comments || []).length,
        commentNumber: this.commentCount,
        starCommentCount: this.starCommentCount,
        category: this.category? this.category.toSimpleJSONFor(): null,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

ArticleSchema.methods.toSimplerJSONFor = function (user) {
    return {
        id: this._id,
        title: this.title,
        user: this.user? this.user.toSimpleProfileJSONFor(user): null,
        // commentNumber: (this.comments || []).length,
        // starCommentCount: this.starCommentCount,
        category: this.category? this.category.toSimpleJSONFor(): null,
        // createdAt: this.createdAt,
        // updatedAt: this.updatedAt
    }
}

mongoose.model('Article', ArticleSchema);
