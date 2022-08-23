const Car = require("./cars.model");
const {
  Statuses,
  prodDateToCompareMilisec,
  milesToCompare,
  fuelLevelToCompare,
  coordToUpdate
} = require("../../constants");

class CarService {
  async getAllCars() {
    return await Car.find({});
  }
  async getCarsInUseByFuel() {
    const cars = await Car.find({
      status: Statuses.inUse,
      fuelLevel: { $lt: fuelLevelToCompare },
    });
    return cars;
  }
  async getReservedCarsWithUnauthDriverCard() {
    const cars = await Car.find({
      status: Statuses.reserved,
      "currentRun.driver.bankCard": { $ne: null },
    });
    return cars.map((car) => Car.returnReservedCarsWithUnauthDriverCard(car))
  }
  async addCar(car) {
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
    const cars = await Car.find({
      "bookingsHistory.2": { "$exists": true },
      status: { $nin: [Statuses.inUse, Statuses.reserved] }
    });
    const updatedCars = await Promise.all(cars.map(async (car) => await Car.updateOne({
      _id: car.id
    }, {
      "location.coordinates": coordToUpdate
    })
    ));
    const updatedNum = updatedCars.reduce((acc, val) => acc + val.modifiedCount, 0);
    return updatedNum;
  }
  async deleteCar(vin) {
    const res = await Car.deleteOne({ vin });
    return res.deletedCount;
  }
}

module.exports = new CarService();
