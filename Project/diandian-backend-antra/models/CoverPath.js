const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// var slug = require('slug');
// var User = mongoose.model('User');

const CoverPathSchema = new mongoose.Schema({
    coverPath: String,
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
}, {timestamps: true});

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

CoverPathSchema.methods.toJSONFor = function(note){
    return {
        id: this._id,
        coverPath: this.coverPath,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

mongoose.model('CoverPath', CoverPathSchema);
