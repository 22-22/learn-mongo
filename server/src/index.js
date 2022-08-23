const express = require("express");
const mongoose = require("mongoose");
const carsRouter = require("./api/cars/cars.router");
const { PORT, MONGO_CONNECTION_STRING } = require("./config");

const app = express();

app.use(express.json());

app.use("/api", carsRouter);
app.use("*", (req, res) => res.send("This page does not exist."));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

// ф, которая будет подключаться к бд и запускать сервер
const start = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    app.listen(PORT, () => {
      console.log("Server started");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
