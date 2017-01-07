var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cateSchema = new Schema({
    name: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Category', cateSchema);