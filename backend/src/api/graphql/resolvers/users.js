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
    createUser: async (parent, args) => {
      try {
        const existingUser = await User.findOne({
          email: args.userInput.email
        });

        if(existingUser) {
          throw new Error("User exists already!")
        }

        const hashedPassword = await bcrypt.hash(
          args.userInput.password,
          12
        );
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
        const result = await user.save();

        return { ...result._doc, password: null };
      } catch (err) {
        throw err;
      }
    }
  }
};
