const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: /\S+@\S+\.\S+/
  },
  password: {
    type: String,
    required: true
  },
  uploadedImages: [{ type: Schema.Types.ObjectId, ref: "Image" }],
  purchasedImages: [{ type: Schema.Types.ObjectId, ref: "Image" }],
});

module.exports = mongoose.model("User", userSchema);
