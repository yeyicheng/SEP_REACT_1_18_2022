const mongoose = require('mongoose');

const FeedbackForDianDianWebSchema = new mongoose.Schema({
    type: Number,
    contact: String,
    content: String
}, {timestamps: true});

FeedbackForDianDianWebSchema.methods.toJSONFor = function(note){
    return {
        id: this._id,
        type: this.type,
        contact: this.contact,
        content: this.content,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

mongoose.model('FeedbackForDianDianWeb', FeedbackForDianDianWebSchema);
