const Car = require("./cars.model");
const { Statuses } = require("../../constants");

class CarService {
  async getAllCars() {
    return await Car.find({});
  }
  async getCarsInUseByFuel(fuelLevel) {
    const cars = await Car.find({
      status: Statuses.inUse,
      fuelLevel: { $lt: fuelLevel },
    });
    return cars;
  }
  async getReservedCarsWithUnauthDriverCard() {
    const cars = await Car.find({
      status: Statuses.reserved,
      "currentRun.driver.bankCard": { $ne: null },
    });
    return cars;
  }
  async addCar(car) {
    // await Car.create(car, function (err, car) {
    //   console.log(err, car);
    // });
    return await Car.create(car);
  }
  async updateCarStatusInService() {
    const result = await Car.updateMany({
      mileage: {$gt: 10000}
    }, {
      status: Statuses.inService
    });
    return result.modifiedCount;
  }
}

module.exports = new CarService();
