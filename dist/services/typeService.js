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
exports.deleteTypeById = exports.updateTypeById = exports.getTypes = exports.createType = exports.typeExstsById = exports.typeExists = void 0;
const database_1 = require("../config/database");
const typeExists = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return yield db.get(` SELECT * FROM Types WHERE name = ?`, [name]);
});
exports.typeExists = typeExists;
const typeExstsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return yield db.get(`SELECT * FROM Types WHERE id = ?`, [id]);
});
exports.typeExstsById = typeExstsById;
const createType = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name }) {
    const db = yield (0, database_1.openDb)();
    const existsType = yield (0, exports.typeExists)(name);
    if (existsType)
        return { type: null, error: 'Type already registered' };
    yield db.run(`INSERT INTO Types(id, name) VALUES (?, ?)`, [id, name]);
    const createdType = yield db.get('SELECT * FROM Types WHERE id = ?', [id]);
    return !createdType
        ? { type: null, error: 'Error creating type' }
        : { type: createdType, error: null };
});
exports.createType = createType;
const getTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    return db.all(`
    SELECT
      t.id AS type_id,
      t.name AS type_name,
      COUNT(tt.tour_id) AS tour_count,
      MIN(tour.price_per_person) AS min_price
    FROM
      Types t
    LEFT JOIN
      TourTypes tt ON t.id = tt.type_id
    LEFT JOIN
      Tours tour ON tt.tour_id = tour.id
    GROUP BY
      t.id, t.name;`);
});
exports.getTypes = getTypes;
const updateTypeById = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name }) {
    const db = yield (0, database_1.openDb)();
    const existsType = yield (0, exports.typeExstsById)(id);
    if (!existsType)
        return { type: null, error: 'Type not found' };
    try {
        yield db.run(`UPDATE Types SET name = ? WHERE id = ?`, [name, id]);
        const updateType = yield db.get('SELECT * FROM Types WHERE id = ?', [id]);
        return { type: updateType, error: null };
    }
    catch (error) {
        return { type: null, error: 'Error updating type' };
    }
});
exports.updateTypeById = updateTypeById;
const deleteTypeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const existsType = yield (0, exports.typeExstsById)(id);
    if (!existsType)
        return { type: null, error: 'Type not found' };
    try {
        yield db.run('DELETE FROM Types WHERE id = ?', [id]);
        return { type: existsType, error: null };
    }
    catch (error) {
        return { type: null, error: 'Error deleting type' };
    }
});
exports.deleteTypeById = deleteTypeById;
