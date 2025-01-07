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
exports.deleteCountry = exports.updateCountry = exports.getAllCountriesByCont = exports.getAllCountries = exports.registerCountry = void 0;
const countryService_1 = require("../services/countryService");
const uuid_1 = require("uuid");
const countryModel_1 = require("../models/countryModel");
const crudHelper_1 = require("../helpers/crudHelper");
const registerCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { name, continent, urlImg } = req.body;
        const createdCountry = yield (0, countryService_1.createCountry)({ id, name, continent, urlImg });
        return createdCountry.error
            ? res.status(400).json({ country: null, error: createdCountry.error })
            : res.status(201).json({ country: createdCountry.country, message: "Country registered successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error creating country' });
    }
});
exports.registerCountry = registerCountry;
const getAllCountries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield (0, countryService_1.getCountries)();
        return res.status(200).json({ countries });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error searching countries' });
    }
});
exports.getAllCountries = getAllCountries;
const getAllCountriesByCont = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield (0, countryService_1.getCountriesByCont)();
        return res.status(200).json({ countries });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error searching countries' });
    }
});
exports.getAllCountriesByCont = getAllCountriesByCont;
const updateCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = (0, crudHelper_1.generateUpdates)(countryModel_1.country, req.body);
        if (Object.keys(updates).length === 0)
            return res.status(400).json({ error: "No fields provided for update" });
        const updatedCountry = yield (0, countryService_1.updateCountryById)(id, updates);
        return updatedCountry.error
            ? res.status(400).json({ country: null, error: updatedCountry.error })
            : res.status(200).json({ country: updatedCountry.country, message: "Country updated successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error updating countries' });
    }
});
exports.updateCountry = updateCountry;
const deleteCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCountry = yield (0, countryService_1.deleteCountryById)(id);
        return deletedCountry.error
            ? res.status(400).json({ country: null, error: deletedCountry })
            : res.status(200).json({ country: deletedCountry.country, message: 'Country deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error deleting country' });
    }
});
exports.deleteCountry = deleteCountry;
