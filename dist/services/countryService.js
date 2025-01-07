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
exports.deleteCountryById = exports.updateCountryById = exports.getCountriesByCont = exports.getCountries = exports.createCountry = exports.countryExistsById = exports.countryExists = void 0;
const database_1 = require("../config/database");
const crudHelper_1 = require("../helpers/crudHelper");
const countryExists = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return yield db.get('SELECT * FROM Country WHERE name = ?', [name]);
});
exports.countryExists = countryExists;
const countryExistsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return yield db.get('SELECT * FROM Country WHERE id = ?', [id]);
});
exports.countryExistsById = countryExistsById;
const createCountry = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name, continent, urlImg }) {
    const db = yield (0, database_1.openDb)();
    const existsCountry = yield (0, exports.countryExists)(name);
    if (existsCountry)
        return { country: null, error: 'Country already registered' };
    yield db.run(`
    INSERT INTO Country( id, name, continent, urlImg) 
    VALUES (?, ?, ?, ?)`, [id, name, continent, urlImg]);
    const createdCountry = yield db.get('SELECT * FROM Country WHERE id = ?', [id]);
    return !exports.createCountry
        ? { country: null, error: 'Error creating country' }
        : { country: createdCountry, error: null };
});
exports.createCountry = createCountry;
const getCountries = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return db.all('SELECT * FROM Country');
});
exports.getCountries = getCountries;
const getCountriesByCont = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const rows = yield db.all(`
    SELECT continent, json_group_array(json_object(
      'id', id,
      'name', name,
      'urlImg', urlImg
    )) AS countries
    FROM Country
    GROUP BY continent;
  `);
    return rows.map(row => ({
        continent: row.continent,
        countries: JSON.parse(row.countries),
    }));
});
exports.getCountriesByCont = getCountriesByCont;
const updateCountryById = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const existsCountry = yield (0, exports.countryExistsById)(id);
    if (!existsCountry)
        return { country: null, error: 'Country not found' };
    const { keys, values } = (0, crudHelper_1.getKeysAndValuesToUpdate)(updates);
    try {
        yield db.run(`UPDATE Country SET ${keys} WHERE id = ?`, [...values, id]);
        const updatedCountry = yield db.get(`SELECT * FROM Country WHERE id = ?`, [id]);
        return { country: updatedCountry, error: null };
    }
    catch (error) {
        return { country: null, error };
    }
});
exports.updateCountryById = updateCountryById;
const deleteCountryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const existsCountry = yield (0, exports.countryExistsById)(id);
    if (!existsCountry)
        return { country: null, error: 'Country not found' };
    try {
        yield db.run(`DELETE FROM Country WHERE id = ?`, [id]);
        return { country: existsCountry, error: null };
    }
    catch (error) {
        return { country: null, error: 'Error deleting country' };
    }
});
exports.deleteCountryById = deleteCountryById;
