const Statuses = {
    free: "free",
    inService: "inService",
    inUse: "inUse",
    reserved: "reserved",
    unavailable: "unavailable"
};
const prodDateToCompare = new Date(2017, 00, 01);
const prodDateToCompareMilisec = prodDateToCompare.getTime();
const milesToCompare = 100000;
const fuelLevelToCompare = 0.25;
const coordToUpdate = [27.5442615, 53.8882836];

module.exports = {
    Statuses,
    prodDateToCompareMilisec,
    milesToCompare,
    fuelLevelToCompare,
    coordToUpdate
};