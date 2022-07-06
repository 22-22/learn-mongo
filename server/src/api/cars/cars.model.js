const { Schema, model } = require("mongoose");
const { Statuses } = require("../../constants");

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
},
  //  {_id: false}
);

const carSchema = new Schema({
  vin: String,
  registrNumber: Number,
  prodInfo: { brand: String, model: String, date: Date },
  status: {
    type: String,
    enum: [
      Statuses.free,
      Statuses.inService,
      Statuses.inUse,
      Statuses.reserved,
      Statuses.unavailable]
  },
  fuelLevel: Number,
  mileage: Number,
  currentRun: currentRunSchema,
  startFuelLevel: Number,
  startMileage: Number,
  // TODO
  // location: GeoJSON
  bookingsHistory: [currentRunSchema],
  finishFuelLevel: Number,
  finishMileage: Number,
});

module.exports = model("Car", carSchema);
