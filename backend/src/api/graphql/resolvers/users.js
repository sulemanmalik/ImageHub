const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    users: async args => {
      const users = await User.find();
      return users;
    }
  },
  Mutation: {
    createUser: async (parent, args,) => {
      try {
        const user = new User({
          email: args.userInput.email,
          password: args.userInput.password
        });

        const result = await user.save();

        return { ...result._doc, password: null };

      } catch (err) {
        throw err;
      }
    }
  }
};
