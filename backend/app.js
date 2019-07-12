const express = require("express");
const bodyParser = require("body-parser");
const { GraphQLServer } = require("graphql-yoga");
const chalk = require("chalk");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config")

//graphql types
const typeDefs = require("./src/api/graphql/schema/schema")
const resolvers = require("./src/api/graphql/resolvers/index")

const app = express();

app.use(bodyParser.json());

const server = new GraphQLServer({
    typeDefs,
    resolvers
})
//cKEdIkGRdZeeI0QT  mongo pw

mongoURI = `mongodb+srv://${config.development.database.user}:${
    config.development.database.password
  }@imagehub-0oqob.mongodb.net/${
    config.development.database.db
  }?retryWrites=true&w=majority`

  const port = 4000;

  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(
      server.start(() =>
        console.log(
          chalk.green.bold.inverse("SUCCESS") +
            ` - Running a GraphQL API server at localhost:${port}`
        )
      )
    )
    .catch(err => console.log(chalk.red.bold.inverse("ERROR"), err));

app.listen(3000)