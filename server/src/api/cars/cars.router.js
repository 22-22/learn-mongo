const express = require("express");
const CarController = require("./cars.controller");

const router = express.Router();

// router.get("/cars/:id", CarController.getAllCars);
router.get("/cars", CarController.getAllCars);

router.get("/carsInUse", CarController.getCarsInUseByFuel);
router.get("/carsReserved", CarController.getReservedCarsWithUnauthDriverCard);

router.post("/cars", CarController.addCar);

router.put("/cars", CarController.updateCarStatus);
router.put("/cars/coord", CarController.updateCarCoordinates);

router.delete("/cars", CarController.deleteCar);

module.exports = router;
