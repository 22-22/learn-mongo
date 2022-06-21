const Car = require("./cars.model");

class CarService {
  async getCarsInUseByFuel(fuelLevel) {
    const cars = await Car.find({
      status: "inUse",
      // FIXME
      fuelLevel: { $lt: fuelLevel },
    });
    console.log(fuelLevel, cars);
    return cars;
  }
}

module.exports = new CarService();
