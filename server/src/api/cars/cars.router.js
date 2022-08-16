const express = require("express");
const CarController = require("./cars.controller");

const router = express.Router();

router.get("/cars", CarController.getAllCars);
router.get("/car", CarController.getCars);

router.post("/cars", CarController.addCar);

router.put("/cars", CarController.updateCarStatus);
router.put("/cars/coord", CarController.updateCarCoordinates);

router.delete("/cars", CarController.deleteCar);

module.exports = router;
