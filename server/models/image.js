const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  image: String,
  tags: [String],
  voters: [{type: Schema.Types.ObjectId, ref: 'User'}],
  UserId: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;