const Car = require("./cars.model");
const CarService = require("./cars.service");
class CarController {
  async getCars(req, res) {
    // const car = db.filter((car) => car.status === "inUse" && car.fuel < 25);
    // const cars = await Car.find({});
    const { fuelLevel } = req.query;
    if (fuelLevel) {
      const cars = await CarService.getCarsInUseByFuel(fuelLevel);
      res.json(cars);
    } else {
      const isAuthorised = await Car.find({
        status: "reserved",
        "currentRun.driver.bankCard": { $ne: null },
      });
      res.json(isAuthorised);
    }
  }
}

module.exports = new CarController();
