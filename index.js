const dotenv = require("dotenv");
const path = require("path");

// dotenv configuration
dotenv.config({
  path: path.join(__dirname, ".env"),
});
console.log(
  `******** Application started in ${process.env.NODE_ENV} mode ********`
);

const schedule = require('./utils/scheduler')();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const routes = require("./routes");


// error handler
const errorHandler = require("./utils/error/error-handler").errorHandler;

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors 
app.use(cors());

// routes
app.use("/services/v1", routes);


app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server up on " + process.env.PORT);
});
