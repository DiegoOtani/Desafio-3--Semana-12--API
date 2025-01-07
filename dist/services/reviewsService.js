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
exports.deleteReviewById = exports.updateReviewById = exports.getReviewsByTourId = exports.getReviewAveragesByTourId = exports.getReview = exports.createReview = exports.reviewExistsById = void 0;
const database_1 = require("../config/database");
const crudHelper_1 = require("../helpers/crudHelper");
const tourService_1 = require("./tourService");
const reviewExistsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return db.get(`SELECT * FROM Reviews WHERE id = ?`, [id]);
});
exports.reviewExistsById = reviewExistsById;
const createReview = (review) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const reviewExists = yield (0, exports.reviewExistsById)(review.id);
    if (reviewExists)
        return { review: null, error: 'Review already registered' };
    const tourExists = yield (0, tourService_1.tourExistsById)(review.tour_id);
    if (!tourExists)
        return { review: null, error: 'Tour not founded' };
    const { keys, valuesQuery, values } = (0, crudHelper_1.getKeysAndValuesToInsert)(review);
    try {
        yield db.run(`
      INSERT INTO Reviews (${keys})  
      VALUES (${valuesQuery})
    `, values);
        const createdReview = yield (0, exports.reviewExistsById)(review.id);
        return !createdReview
            ? { review: null, error: 'Error creatin review' }
            : { review: createdReview, error: null };
    }
    catch (error) {
        return { review: null, error: 'Error creating review' };
    }
    ;
});
exports.createReview = createReview;
const getReview = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return db.all(`SELECT * FROM Reviews`);
});
exports.getReview = getReview;
const getReviewAveragesByTourId = (tourId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const tourExists = yield (0, tourService_1.tourExistsById)(tourId);
    if (!tourExists)
        return { review: null, error: 'Tour not founded' };
    const result = yield db.get(`
    SELECT 
      AVG(services) AS avg_services,
      AVG(prices) AS avg_prices,
      AVG(locations) AS avg_locations,
      AVG(food) AS avg_food,
      AVG(amenities) AS avg_amenities,
      AVG(room_comfort_quality) AS avg_room_comfort_quality,
      AVG(average) AS avg_overall
    FROM Reviews
    WHERE tour_id = ?;
    `, [tourId]);
    return result;
});
exports.getReviewAveragesByTourId = getReviewAveragesByTourId;
const getReviewsByTourId = (tourId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const tourExists = yield (0, tourService_1.tourExistsById)(tourId);
    if (!tourExists)
        return { reviews: null, error: 'Tour not found' };
    try {
        const reviews = yield db.all(`
      SELECT 
        r.date_review,
        r.name,
        r.average AS average_rating,
        r.comment,
        (
          SELECT COUNT(*) 
          FROM Reviews
          WHERE user_id = r.user_id
        ) AS review_count_by_user
      FROM Reviews r
      WHERE r.tour_id = ?
    `, [tourId]);
        return { reviews, error: null };
    }
    catch (error) {
        return { reviews: null, error: 'Error fetching reviews' };
    }
});
exports.getReviewsByTourId = getReviewsByTourId;
const updateReviewById = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const existsReview = (0, exports.reviewExistsById)(id);
    if (!existsReview)
        return { review: null, error: 'Review not found' };
    const { keys, values } = (0, crudHelper_1.getKeysAndValuesToUpdate)(updates);
    try {
        yield db.run(`UPDATE Reviews SET ${keys} WHERE id = ?`, [...values, id]);
        const updatedReview = yield db.get(`SELECT * FROM Reviews WHERE id = ?`, [id]);
        return { review: updatedReview, error: null };
    }
    catch (error) {
        return { review: null, error: 'Error updating review' };
    }
    ;
});
exports.updateReviewById = updateReviewById;
const deleteReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const existsReview = yield (0, exports.reviewExistsById)(id);
    if (!existsReview)
        return { review: null, error: 'Review not found' };
    try {
        yield db.run(`DELETE FROM Reviews WHERE id = ?`, [id]);
        return { review: existsReview, error: null };
    }
    catch (error) {
        return { review: null, error: 'Error deleting review' };
    }
    ;
});
exports.deleteReviewById = deleteReviewById;
