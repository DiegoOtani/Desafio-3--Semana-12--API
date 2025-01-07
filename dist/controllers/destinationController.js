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
exports.deleteDestination = exports.updateDestination = exports.getAllDestinations = exports.registerDestination = void 0;
const destinationService_1 = require("../services/destinationService");
const uuid_1 = require("uuid");
const destinationsModel_1 = require("../models/destinationsModel");
const crudHelper_1 = require("../helpers/crudHelper");
const registerDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { country, city } = req.body;
        const createdDestination = yield (0, destinationService_1.createDestination)({ id, country, city });
        return createdDestination.error
            ? res.status(400).json({ destination: null, error: createdDestination.error })
            : res.status(201).json({ destination: createdDestination, message: 'Destination created successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error creating destination' });
    }
});
exports.registerDestination = registerDestination;
const getAllDestinations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destinations = yield (0, destinationService_1.getDestinations)();
        return res.status(200).json({ destinations });
    }
    catch (error) {
        return res.status(500).json({ error: "Error searching destinations" });
    }
});
exports.getAllDestinations = getAllDestinations;
const updateDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = (0, crudHelper_1.generateUpdates)(destinationsModel_1.destination, req.body);
        if (Object.keys(updates).length === 0)
            return res.status(400).json({ error: 'No fields provided for update' });
        const updatedDestination = yield (0, destinationService_1.updateDestinationById)(id, updates);
        return updatedDestination.error
            ? res.status(400).json({ destination: null, error: updatedDestination.error })
            : res.status(200).json({ destination: updatedDestination.destination, message: 'Destination updated successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error updating destination' });
    }
});
exports.updateDestination = updateDestination;
const deleteDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedDestination = yield (0, destinationService_1.deleteDestinationById)(id);
        return deletedDestination.error
            ? res.status(400).json({ destination: null, error: deletedDestination.error })
            : res.status(200).json({ destination: deletedDestination.destination, message: "Destination deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Error deletin destination" });
    }
});
exports.deleteDestination = deleteDestination;
