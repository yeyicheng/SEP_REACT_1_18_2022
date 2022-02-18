const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// var slug = require('slug');
// var User = mongoose.model('User');

const ArticleCategorySchema = new mongoose.Schema({
    title: String,
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ArticleCategory' },
    rank: Number
}, {timestamps: true});


ArticleCategorySchema.index({parentCategory:1, title: 1}, {unique: true});
ArticleCategorySchema.plugin(uniqueValidator, {message: 'is already taken'});


ArticleCategorySchema.methods.toJSONFor = function(){
    return {
        categoryId: this.id,
        title: this.title,
        children: this.children.map((c) => {
            return c.toSimpleJSONFor();
        }),
        parentCategory: this.parentCategory? this.parentCategory._id: undefined
    };
};

ArticleCategorySchema.methods.toSimpleJSONFor = function(){
    return {
        categoryId: this.id,
        title: this.title
    };
};

mongoose.model('ArticleCategory', ArticleCategorySchema);
