const Car = require("./cars.model");
const { Statuses, prodDateToCompareMilisec, milesToCompare } = require("../../constants");

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
  async updateCarStatus() {
    const result = await Car.updateMany({
      $or: [
        { "prodInfo.date": { $lt: prodDateToCompareMilisec } },
        { mileage: { $gt: milesToCompare } }
      ]
    }, {
      status: Statuses.inService
    });
    return result.modifiedCount;
  }
  async updateCarCoordinates() {
    const result = await Car.updateMany({
      "bookingHistory.2": {"$exists": true}
    });
    console.log(result);
    console.log(result.modifiedCount);
    return result.modifiedCount;
  }
  async deleteCar(vin) {
    const res = await Car.deleteOne({ vin });
    // что тут вернуть ??
    return res.deletedCount;
  }
}

module.exports = new CarService();
