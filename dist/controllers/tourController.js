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
exports.deleteTour = exports.updateTour = exports.findTourById = exports.getAllToursByPage = exports.getAllTours = exports.registerTour = void 0;
const tourService_1 = require("../services/tourService");
const uuid_1 = require("uuid");
const tourModel_1 = require("../models/tourModel");
const crudHelper_1 = require("../helpers/crudHelper");
const registerTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const createFields = (0, crudHelper_1.generateCreates)(tourModel_1.tour, req.body);
        const createFieldsWithId = Object.assign({ id }, createFields);
        const types = req.body.types || [];
        const createdTour = yield (0, tourService_1.createTour)(createFieldsWithId, types);
        createdTour.error
            ? res.status(400).json({ tour: null, error: createdTour.error })
            : res.status(201).json({ tour: createdTour.tour, message: 'Tour created successfuuly' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error creating tour' });
    }
    ;
});
exports.registerTour = registerTour;
const getAllTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tours = yield (0, tourService_1.getTours)();
        return res.status(200).json({ tours });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error searching tours' });
    }
    ;
});
exports.getAllTours = getAllTours;
const getAllToursByPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const categories = ((_a = req.query.categories) === null || _a === void 0 ? void 0 : _a.split(',')) || [];
        const destinations = ((_b = req.query.destinations) === null || _b === void 0 ? void 0 : _b.split(',')) || [];
        const rating = Number(req.query.rating) || 0;
        const search = req.query.search || "";
        const price = Number(req.query.price) || 0;
        const date = (req.query.date || "");
        const sortBy = req.query.sortBy || "Title";
        const { tours, total } = yield (0, tourService_1.getToursByPage)(page, limit, categories, destinations, rating, search, price, date, sortBy);
        res.status(200).json({ tours, total, currentPage: page, totalPages: Math.ceil((total || 0) / limit) });
    }
    catch (error) {
        res.status(500).json({ error: 'Error searching tours' });
    }
    ;
});
exports.getAllToursByPage = getAllToursByPage;
const findTourById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tour = yield (0, tourService_1.getTourById)(id);
        !tour
            ? res.status(400).json({ error: 'Tour not found' })
            : res.status(200).json({ tour });
    }
    catch (error) {
        res.status(500).json({ error: 'Error searching tour.' });
    }
});
exports.findTourById = findTourById;
const updateTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = (0, crudHelper_1.generateUpdates)(tourModel_1.tour, req.body);
        if (Object.keys(updates).length === 0)
            return res.status(400).json({ error: 'No fields provided for update' });
        const updatedTour = yield (0, tourService_1.updateTourById)(id, updates);
        return updatedTour.error
            ? res.status(400).json({ tour: null, error: updatedTour.error })
            : res.status(200).json({ tour: updatedTour.tour, message: 'Tour updated successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error updating tour' });
    }
});
exports.updateTour = updateTour;
const deleteTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTour = yield (0, tourService_1.deleteTourById)(id);
        return deletedTour.error
            ? res.status(400).json({ tour: null, error: deletedTour.error })
            : res.status(200).json({ tour: deletedTour.tour, message: 'Tour deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error deleting tour' });
    }
});
exports.deleteTour = deleteTour;
