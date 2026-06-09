require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const databaseConnect = require("./app/config/connectDatabase");
const mongoose = require("mongoose");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./app/routes/index");
var usersRouter = require("./app/routes/users");
var adminRouter = require("./app/routes/admin");

var app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL, methods: ["GET", "POST"] },
});

module.exports.io = io;

databaseConnect();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("joinAdmin", () => socket.join("admins"));
  socket.on("joinOrderRoom", (orderId) => socket.join(`order_${orderId}`));
  socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
