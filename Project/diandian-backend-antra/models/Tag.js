const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// var slug = require('slug');
// var User = mongoose.model('User');

const TagSchema = new mongoose.Schema({
    name: String,
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    article: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'}
}, {timestamps: true});

// TagSchema.index({user: 1, name: 1}, {unique: true});
TagSchema.plugin(uniqueValidator, {message: 'is already taken'});

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

TagSchema.methods.toJSONFor = function () {
    return {
        id: this._id,
        name: this.name,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

mongoose.model('Tag', TagSchema);
