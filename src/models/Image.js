const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
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
  },
  // uploadedBy: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User"
  // }
});

module.exports = mongoose.model("Image", imageSchema);
