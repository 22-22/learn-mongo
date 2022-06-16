const express = require("express");
const db = require("../../db");

const router = express.Router();

router.get("/cars", (req, res) => {
  const car = db.filter((car) => car.status === "reserved" && car.fuel < 25);
  res.json(car);
});

module.exports = router;
