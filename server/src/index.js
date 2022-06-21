const express = require("express");
const mongoose = require("mongoose");
const carsRouter = require("./api/cars/cars.router");
const { PORT, MONGO_CONNECTION_STRING } = require("./config");

const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello world!!");
// });
// app.listen(3000);

app.use(express.json());
app.use("/api", carsRouter);

// ф, которая будет подключаться к бд и запускать сервер
// добавить обработку ошибок ??
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
