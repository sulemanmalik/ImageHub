const express = require("express");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads')) //makes uploads folder available to public

//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cors
app.use((req, res, next) => {
    res.setHeader("Access-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200).json();
    }
    next()
  });
  app.use(cors())


const api = require("./src/api/routes/api");
app.use("/images", api.imageRoutes);
app.use("/orders", api.orderRoutes);
app.use("/user", api.userRoutes);

app.use((req, res, next) => {
  const error = new Error("Invalid request!");
  error.status = 404;
  next(error); //forwards the error request
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.use((req, res, next) => {
  res.status(200).json({
    message: "it works"
  });
});

mongoURI = `mongodb+srv://${config.development.database.user}:${
  config.development.database.password
}@imagehub-0oqob.mongodb.net/${
  config.development.database.db
}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, { useNewUrlParser: true })

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// .then(console.log(9)).catch(err => console.log(chalk.red.bold.inverse("ERROR"), err));


module.exports = app;
