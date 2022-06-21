const express = require("express");
const Car = require("./cars.model");
const CarController = require("./cars.controller");

const router = express.Router();

router.get("/cars", CarController.getCars);

router.post("/cars", async (req, res) => {
  const {
    vin,
    registrNumber,
    status,
    fuelLevel,
    mileage,
    startFuelLevel,
    startMileage,
    bookingsHistory,
    finishFuelLevel,
    finishMileage,
  } = req.body;
  const carInstance = new Car({
    vin,
    registrNumber,
    prodInfo: {
      brand: req.body?.prodInfo?.brand,
      model: req.body?.prodInfo?.model,
      date: req.body?.prodInfo?.date,
    },
    status,
    fuelLevel,
    mileage,
    currentRun: {
      startDate: req.body?.currentRun?.startDate,
      driver: {
        licenseNumber: req.body?.currentRun?.driver?.licenseNumber,
        firstName: req.body?.currentRun?.driver?.firstName,
        lastName: req.body?.currentRun?.driver?.lastName,
        bankCard: {
          number: req.body?.currentRun?.driver?.bankCard?.number,
          owner: req.body?.currentRun?.driver?.bankCard?.owner,
          validThrough: req.body?.currentRun?.driver?.bankCard?.validThrough,
        },
      },
    },
    startFuelLevel,
    startMileage,
    bookingsHistory,
    finishFuelLevel,
    finishMileage,
  });
  const car = await Car.create(carInstance);
  res.json(car);
});

module.exports = router;
