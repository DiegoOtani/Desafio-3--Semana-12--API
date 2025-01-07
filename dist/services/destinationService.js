"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDestinationById = exports.updateDestinationById = exports.getDestinations = exports.createDestination = exports.countryIsRegistered = exports.destinationExistsById = exports.destinationExists = void 0;
const database_1 = require("../config/database");
;
const crudHelper_1 = require("../helpers/crudHelper");
const destinationExists = (city) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return db.get('SELECT * FROM Destinations WHERE city = ?', [city]);
});
exports.destinationExists = destinationExists;
const destinationExistsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return db.get(`SELECT * FROM Destinations WHERE id = ?`, [id]);
});
exports.destinationExistsById = destinationExistsById;
const countryIsRegistered = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return db.get('SELECT * FROM Country WHERE id = ?', [id]);
});
exports.countryIsRegistered = countryIsRegistered;
const createDestination = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, country, city }) {
    const db = yield (0, database_1.openDb)();
    const existsDestination = yield (0, exports.destinationExists)(city);
    if (existsDestination)
        return { destination: null, error: 'Destination already registered' };
    const registeredCountry = yield (0, exports.countryIsRegistered)(country);
    if (!registeredCountry)
        return { destination: null, error: 'Invalid Country Id' };
    yield db.run(`
    INSERT INTO Destinations (id, country, city)
    VALUES (?, ?, ?)`, [id, country, city]);
    const createdDestination = yield db.get('SELECT * FROM Destinations WHERE id = ?', [id]);
    return !createdDestination
        ? { destination: null, error: "Error creating destination" }
        : { destination: createdDestination, error: null };
});
exports.createDestination = createDestination;
const getDestinations = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return db.all(`
    SELECT 
      Destinations.id, 
      Country.name as country,
      Destinations.city
    FROM 
      Destinations
    JOIN
      Country
    ON
      Destinations.country = Country.id
  `);
});
exports.getDestinations = getDestinations;
const updateDestinationById = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const existsDestination = yield (0, exports.destinationExistsById)(id);
    if (!existsDestination)
        return { destination: null, error: 'Destination not found' };
    const { keys, values } = (0, crudHelper_1.getKeysAndValuesToUpdate)(updates);
    try {
        yield db.run(`UPDATE Destinations SET ${keys} WHERE id = ?`, [...values, id]);
        const updatedDestination = yield db.get(`SELECT * FROM Destinations WHERE id = ?`, [id]);
        return { destination: updatedDestination, error: null };
    }
    catch (error) {
        return { destination: null, error: "Error updating destination" };
    }
});
exports.updateDestinationById = updateDestinationById;
const deleteDestinationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const existsDestination = yield (0, exports.destinationExistsById)(id);
    if (!existsDestination)
        return { destination: null, error: 'Destination not found' };
    try {
        yield db.run(`DELETE FROM Destinations WHERE id = ?`, [id]);
        return { destination: existsDestination, error: null };
    }
    catch (error) {
        return { destination: null, error: 'Error deleting destination' };
    }
});
exports.deleteDestinationById = deleteDestinationById;
