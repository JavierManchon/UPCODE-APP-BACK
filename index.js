const nodemailer = require("nodemailer")
const express = require("express");
const cors = require("cors");
const { configCloudinary } = require('./src/utils/cloudinary/config.js');
const { connect } = require("./src/utils/db.js");



connect();

const dotenv = require('dotenv');
const UserRoutes = require('./src/api/users/users.routes.js');
const DesignRoutes = require("./src/api/design/designs.routes.js");
const TicketRoutes = require("./src/api/tickets/tickets.routes.js");
dotenv.config();
 

configCloudinary();

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  cors({
    origin: ["*"],
  })
);

//Routes
app.use('/api/users', UserRoutes)
app.use('/api/designs', DesignRoutes)
app.use('/api/tickets', TicketRoutes)
app.use("/public", express.static("public"));
app.use("/api", (req, res, next) => "im alive");

const PORT = process.env.PORT || 8084;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port 🙈: ${PORT}`);
});

app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error("Something went wrong"));
  });
});

app.disable('x-powered-by')

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

