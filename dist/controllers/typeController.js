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
exports.deleteType = exports.updateType = exports.getAllTypes = exports.registerType = void 0;
const typeService_1 = require("../services/typeService");
const uuid_1 = require("uuid");
const registerType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { name } = req.body;
        const createdType = yield (0, typeService_1.createType)({ id, name });
        return createdType.error
            ? res.status(400).json({ type: null, error: createdType.error })
            : res.status(201).json({ type: createdType.type, message: 'Type registered successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error creating type' });
    }
});
exports.registerType = registerType;
const getAllTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const types = yield (0, typeService_1.getTypes)();
        return res.status(200).json({ types });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error searching type' });
    }
});
exports.getAllTypes = getAllTypes;
const updateType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedType = yield (0, typeService_1.updateTypeById)({ id, name });
        return updatedType.error
            ? res.status(400).json({ type: null, error: updatedType.error })
            : res.status(200).json({ type: updatedType.type, message: 'Type updated successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error updating type' });
    }
});
exports.updateType = updateType;
const deleteType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedType = yield (0, typeService_1.deleteTypeById)(id);
        return deletedType.error
            ? res.status(400).json({ type: null, error: deletedType.error })
            : res.status(200).json({ type: deletedType.type, message: 'Type deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error deleting type' });
    }
});
exports.deleteType = deleteType;
