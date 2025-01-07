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
exports.deleteTourById = exports.updateTourById = exports.getTourById = exports.getToursByPage = exports.getTours = exports.createTour = exports.tourExistsById = void 0;
const database_1 = require("../config/database");
const crudHelper_1 = require("../helpers/crudHelper");
const destinationService_1 = require("./destinationService");
const typeService_1 = require("./typeService");
const tourExistsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return db.get(`SELECT * FROM Tours WHERE id = ?`, [id]);
});
exports.tourExistsById = tourExistsById;
const createTour = (tour, types) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const tourExists = yield (0, exports.tourExistsById)(tour.id);
    if (tourExists)
        return { tour: null, error: "Tour alredy registered" };
    const destinationExists = yield (0, destinationService_1.destinationExistsById)(tour.city);
    if (!destinationExists)
        return { tour: null, error: 'Invalid destination' };
    for (const typeId of types) {
        const typeExists = yield (0, typeService_1.typeExstsById)(typeId);
        if (!typeExists)
            return { tour: null, error: "Invalid type" };
    }
    const { keys, valuesQuery, values } = (0, crudHelper_1.getKeysAndValuesToInsert)(tour);
    try {
        yield db.run(`
      INSERT INTO Tours (${keys})  
      VALUES (${valuesQuery})
    `, values);
        for (const typeId of types) {
            yield db.run(`
        INSERT INTO TourTypes (tour_id, type_id)  
        VALUES (?, ?)
      `, [tour.id, typeId]);
        }
        const createdTour = yield (0, exports.tourExistsById)(tour.id);
        return !createdTour
            ? { tour: null, error: 'Error creating tour' }
            : { tour: createdTour, error: null };
    }
    catch (error) {
        return { tour: null, error: 'Error creating tour' };
    }
});
exports.createTour = createTour;
const getTours = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return db.all(`
    SELECT 
      Tours.id AS tour_id,
      Tours.name AS tour_name,
      Destinations.city AS city,
      Country.name AS country_name,
      Tours.initial_date,
      Tours.end_date,
      Tours.duration,
      Tours.price_per_person,
      Tours.peoples,
      Tours.max_people,
      Tours.min_age,
      Tours.overview,
      Tours.location,
      Tours.ulrImg,
      GROUP_CONCAT(Types.name) AS types,
      COUNT(Reviews.id) AS review_count,
      AVG(Reviews.average) AS average_review
    FROM 
      Tours
    JOIN 
      Destinations ON Tours.city = Destinations.id
    JOIN 
      Country ON Destinations.country = Country.id
    JOIN 
      TourTypes ON Tours.id = TourTypes.tour_id
    JOIN 
      Types ON TourTypes.type_id = Types.id
    LEFT JOIN 
      Reviews ON Tours.id = Reviews.tour_id
    GROUP BY 
      Tours.id
    ORDER BY 
      Tours.peoples DESC 
    LIMIT 
      8; 
  `);
});
exports.getTours = getTours;
const getToursByPage = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 9, categories = [], countryDestinations = [], rating = 0, search, price, date, sortBy = "Title") {
    const db = yield (0, database_1.openDb)();
    const offset = (page - 1) * limit;
    let query = `
    SELECT 
      Tours.id AS tour_id,
      Tours.name AS tour_name,
      Destinations.city AS city,
      Country.name AS country_name,
      Tours.initial_date,
      Tours.end_date,
      Tours.duration,
      Tours.price_per_person,
      Tours.peoples,
      Tours.max_people,
      Tours.min_age,
      Tours.overview,
      Tours.location,
      Tours.ulrImg,
      GROUP_CONCAT(DISTINCT Types.name) AS types,
      COUNT(DISTINCT Reviews.id) AS review_count,
      AVG(Reviews.average) AS average_review
    FROM 
      Tours
    JOIN 
      Destinations ON Tours.city = Destinations.id
    JOIN 
      Country ON Destinations.country = Country.id
    JOIN 
      TourTypes ON Tours.id = TourTypes.tour_id
    JOIN 
      Types ON TourTypes.type_id = Types.id
    LEFT JOIN 
      Reviews ON Tours.id = Reviews.tour_id
  `;
    const conditions = [];
    const parameters = [];
    if (categories.length > 0) {
        conditions.push(`Types.name IN (${categories.map(() => '?').join(',')})`);
        parameters.push(...categories);
    }
    if (countryDestinations.length > 0) {
        conditions.push(`Country.name IN (${countryDestinations.map(() => '?').join(',')})`);
        parameters.push(...countryDestinations);
    }
    if (rating > 0) {
        conditions.push(`Reviews.average >= ?`);
        parameters.push(rating);
    }
    if (search) {
        conditions.push(`(Tours.name LIKE ? OR Destinations.city LIKE ?)`);
        parameters.push(`%${search}%`, `%${search}%`);
    }
    if (price > 0) {
        conditions.push(`Tours.price_per_person >= ?`);
        parameters.push(price);
    }
    if (date) {
        conditions.push(`Tours.initial_date >= ?`);
        parameters.push(date);
    }
    if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
    }
    query += ` GROUP BY Tours.id `;
    if (sortBy === "Price") {
        query += ` ORDER BY Tours.price_per_person ASC`;
    }
    else {
        query += ` ORDER BY Tours.name ASC`;
    }
    query += ` LIMIT ? OFFSET ?;`;
    const tours = yield db.all(query, [...parameters, limit, offset]);
    const countQuery = `
    SELECT COUNT(DISTINCT Tours.id) AS count
    FROM 
      Tours
    JOIN 
      Destinations ON Tours.city = Destinations.id
    JOIN 
      Country ON Destinations.country = Country.id
    JOIN 
      TourTypes ON Tours.id = TourTypes.tour_id
    JOIN 
      Types ON TourTypes.type_id = Types.id
    LEFT JOIN 
      Reviews ON Tours.id = Reviews.tour_id
    ${conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''}
  `;
    const total = yield db.get(countQuery, parameters);
    return {
        tours,
        total: (total === null || total === void 0 ? void 0 : total.count) || 0
    };
});
exports.getToursByPage = getToursByPage;
const getTourById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const tour = yield db.get(`
    SELECT 
      Tours.id AS tour_id,
      Tours.name AS tour_name,
      Destinations.city AS city,
      Country.name AS country_name,
      Tours.initial_date,
      Tours.end_date,
      Tours.duration,
      Tours.price_per_person,
      Tours.peoples,
      Tours.max_people,
      Tours.min_age,
      Tours.overview,
      Tours.location,
      Tours.ulrImg,
      GROUP_CONCAT(DISTINCT Types.name) AS types,
      (SELECT COUNT(*) FROM Reviews WHERE Reviews.tour_id = Tours.id) AS review_count,
      (SELECT AVG(Reviews.average) FROM Reviews WHERE Reviews.tour_id = Tours.id) AS average_review
    FROM 
      Tours
    JOIN 
      Destinations ON Tours.city = Destinations.id
    JOIN 
      Country ON Destinations.country = Country.id
    JOIN 
      TourTypes ON Tours.id = TourTypes.tour_id
    JOIN 
      Types ON TourTypes.type_id = Types.id
    WHERE 
      Tours.id = ?
    GROUP BY 
      Tours.id;
  `, [id]);
    return tour || null;
});
exports.getTourById = getTourById;
const updateTourById = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const existsTour = yield (0, exports.tourExistsById)(id);
    if (!existsTour)
        return { tour: null, error: 'Tour not found' };
    const { keys, values } = (0, crudHelper_1.getKeysAndValuesToUpdate)(updates);
    try {
        yield db.run(`UPDATE Tours SET ${keys} WHERE id = ?`, [...values, id]);
        const updatedTour = yield db.get(`SELECT * FROM Tours WHERE id = ?`, [id]);
        return { tour: updatedTour, error: null };
    }
    catch (error) {
        return { tour: null, error: 'Error updating tour' };
    }
});
exports.updateTourById = updateTourById;
const deleteTourById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const existsTour = yield (0, exports.tourExistsById)(id);
    if (!existsTour)
        return { tour: null, error: 'Tour not founded' };
    try {
        yield db.run(`DELETE FROM Tours WHERE id = ?`, [id]);
        return { tour: existsTour, error: null };
    }
    catch (error) {
        return { tour: null, error: 'Error deleting tour' };
    }
});
exports.deleteTourById = deleteTourById;
