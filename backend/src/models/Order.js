const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  image: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
      required: true
  }
});

module.exports = mongoose.model("Order", orderSchema);
