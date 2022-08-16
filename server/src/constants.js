const Statuses = {
    free: "free",
    inService: "inService",
    inUse: "inUse",
    reserved: "reserved",
    unavailable: "unavailable"
}

const prodDateToCompare = new Date(2017, 00, 01);
const prodDateToCompareMilisec = prodDateToCompare.getTime();
const milesToCompare = 100000;

module.exports = {
    Statuses,
    prodDateToCompareMilisec,
    milesToCompare
}