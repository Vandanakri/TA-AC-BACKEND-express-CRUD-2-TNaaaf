var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({

  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  author: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  Comment: [
    {type: mongoose.Schema.Types.ObjectId, required:true, ref: 'Comment'},
  ]
}, { timestamps: true });

module.exports = mongoose.model('blog', blogSchema);
