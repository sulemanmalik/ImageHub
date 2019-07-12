module.exports = `
type User {
    _id: ID!
    email: String!
    password: String
}

input UserInput {
    email: String!
    password: String
}

type Query {
    users: [User!]!
  }
  
type Mutation {
    createUser(userInput: UserInput): User
  }
`;
