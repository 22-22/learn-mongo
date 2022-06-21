const { Schema, model } = require("mongoose");

const currentRunSchema = new Schema({
  startDate: Date,
  driver: {
    licenseNumber: Number,
    firstName: String,
    lastName: String,
    bankCard: {
      number: Number,
      owner: String,
      validThrough: Date,
    },
  },
});

const carSchema = new Schema({
  vin: String,
  registrNumber: Number,
  prodInfo: { brand: String, model: String, date: Date },
  status: String,
  fuelLevel: Number,
  mileage: Number,
  currentRun: currentRunSchema,
  startFuelLevel: Number,
  startMileage: Number,
  // location:
  bookingsHistory: [currentRunSchema],
  finishFuelLevel: Number,
  finishMileage: Number,
});

module.exports = model("Car", carSchema);
