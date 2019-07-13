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
  }
});

module.exports = mongoose.model("Image", imageSchema);
