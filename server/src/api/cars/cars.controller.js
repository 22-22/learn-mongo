const Car = require("./cars.model");
const CarService = require("./cars.service");
class CarController {
  // добавить next и обработку ошибок
  async getAllCars(req, res) {
    try {
      const cars = await CarService.getAllCars();;
      res.json(cars);
    } catch (err) {
      console.log(err);
    }
  }
  async getCars(req, res) {
    try {
      const { fuelLevel } = req.query;
      if (fuelLevel) {
        const cars = await CarService.getCarsInUseByFuel(fuelLevel);
        res.json(cars);
      } else {
        const cars = await CarService.getReservedCarsWithUnauthDriverCard();
        res.json(cars);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async addCar(req, res) {
    try {
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
      // const carInstance = new Car({
      const carInstance = {
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
      };
      const car = await CarService.addCar(carInstance);
      res.json(car);
    } catch (err) {
      console.log(err);
    }
  }
  async updateCarStatusInService(req, res) {
    try {
      const carsUpdated = await CarService.updateCarStatusInService();
      res.json(carsUpdated);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new CarController();
