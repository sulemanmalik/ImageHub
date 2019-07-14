const User = require("../models/User");
const Image = require("../models/Image");

const userDrill = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user,
      _id: user.id,
      uploadedImages: imageDrill.bind(this, user._doc.uploadedImages)
    };
  } catch (err) {
    throw err;
  }
};

const imageDrill = async imageId => {
  try {
    const images = await Image.find({
      _id: { $in: imageIds }
    });

    return images.map(img => {
      return {
        ...img._doc,
        _id: img.id,
        uploadedBy: userDrill.bind(this, img.uploadedBy)
      };
    });
  } catch (err) {
    throw err;
  }
};

module.exports = { userDrill };
