var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  content: { type: String, required: true },
  blogId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'blog' },
}, { timestamps: true });

module.exports = mongoose.model('comment', commentSchema);
