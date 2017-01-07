var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    username: {type: String, required: true},
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    post_title: {type: String, required: true},
    content: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', commentSchema);