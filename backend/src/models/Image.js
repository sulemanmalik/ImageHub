const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageURL: {
      type: String,
      required: true
  },
  discount: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model("Image", imageSchema);
