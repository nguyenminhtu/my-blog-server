var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    content: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Post', postSchema);