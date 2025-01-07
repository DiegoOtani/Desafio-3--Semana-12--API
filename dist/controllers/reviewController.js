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
exports.deleteReview = exports.updateReview = exports.getReviewsByTour = exports.getAverageReviewById = exports.getAllReviews = exports.registerReview = void 0;
const reviewsService_1 = require("../services/reviewsService");
const uuid_1 = require("uuid");
const reviewsModel_1 = require("../models/reviewsModel");
const crudHelper_1 = require("../helpers/crudHelper");
const registerReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const createFields = (0, crudHelper_1.generateCreates)(reviewsModel_1.review, req.body);
        const createFieldsWithId = Object.assign({ id }, createFields);
        const createdReview = yield (0, reviewsService_1.createReview)(createFieldsWithId);
        return createdReview.error
            ? res.status(400).json({ review: null, error: createdReview.error })
            : res.status(200).json({ review: createdReview.review, message: 'Review created successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error creating review' });
    }
    ;
});
exports.registerReview = registerReview;
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield (0, reviewsService_1.getReview)();
        return res.status(200).json({ reviews });
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro searching reviews' });
    }
    ;
});
exports.getAllReviews = getAllReviews;
const getAverageReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const review = yield (0, reviewsService_1.getReviewAveragesByTourId)(id);
        return review.error
            ? res.status(400).json({ review: null, error: review.error })
            : res.status(200).json({ review });
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro searching review' });
    }
});
exports.getAverageReviewById = getAverageReviewById;
const getReviewsByTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const reviews = yield (0, reviewsService_1.getReviewsByTourId)(id);
        return reviews.error
            ? res.status(400).json({ review: null, error: reviews.error })
            : res.status(200).json(reviews);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro searching reviews' });
    }
});
exports.getReviewsByTour = getReviewsByTour;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = (0, crudHelper_1.generateUpdates)(reviewsModel_1.review, req.body);
        if (Object.keys(updates).length === 0)
            return res.status(400).json({ error: 'No fields provided for update' });
        const updatedReview = yield (0, reviewsService_1.updateReviewById)(id, updates);
        return updatedReview.error
            ? res.status(400).json({ review: null, error: updatedReview.error })
            : res.status(200).json({ review: updatedReview.review, message: 'Review updated successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error updating review' });
    }
    ;
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedReview = yield (0, reviewsService_1.deleteReviewById)(id);
        return deletedReview.error
            ? res.status(400).json({ review: null, error: deletedReview.error })
            : res.status(200).json({ review: deletedReview.review, message: 'Review deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error deleting review' });
    }
    ;
});
exports.deleteReview = deleteReview;
