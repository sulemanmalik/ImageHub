const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  image: {
    type: Schema.Types.ObjectId,
    ref: "Image",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);
