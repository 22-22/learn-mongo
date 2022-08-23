const CarService = require("./cars.service");
class CarController {
  async getAllCars(req, res, next) {
    try {
      const cars = await CarService.getAllCars();
      // http://localhost:3000/api/cars/1?fuel=22
      // console.log(`hi params ${req.params.id}`);
      // console.log(`hi query ${req.query.fuel}`);
      res.json(cars);
    } catch (err) {
      // выдает html c ошибкой
      next(err);
    }
  }
  async getCarsInUseByFuel(req, res, next) {
    try {
      const cars = await CarService.getCarsInUseByFuel();
      res.json(cars);
    } catch (err) {
      next(err);
    }
  }
  async getReservedCarsWithUnauthDriverCard(req, res, next) {
    try {
      const cars = await CarService.getReservedCarsWithUnauthDriverCard();
      res.json(cars);
    } catch (err) {
      next(err);
    }
  }
  async addCar(req, res, next) {
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
      // вроде если MyModel.create(car), то просто создаем объект.
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
        location: {
          coordinates: req.body?.location?.coordinates
        },
        bookingsHistory,
        finishFuelLevel,
        finishMileage,
      };
      const car = await CarService.addCar(carInstance);
      res.json(car);
    } catch (err) {
      next(err);
    }
  }
  async updateCarStatus(req, res, next) {
    try {
      const carsUpdated = await CarService.updateCarStatus();
      res.json(carsUpdated);
    } catch (err) {
      next(err);
    }
  }
  async updateCarCoordinates(req, res, next) {
    try {
      const carsUpdated = await CarService.updateCarCoordinates();
      res.json(carsUpdated);
    } catch (err) {
      next(err);
    }
  }
  async deleteCar(req, res, next) {
    try {
      const { vin } = req.query;
      const result = await CarService.deleteCar(vin);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CarController();
