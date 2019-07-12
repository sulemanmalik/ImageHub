const userResolver = require("./users")

const rootResolver = {
    Query: {
        ...userResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation
    }
}

module.exports = rootResolver;
