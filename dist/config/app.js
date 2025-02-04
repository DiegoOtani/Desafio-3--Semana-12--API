"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeRoutes_1 = __importDefault(require("../routes/typeRoutes"));
const countryRoutes_1 = __importDefault(require("../routes/countryRoutes"));
const destinationRoutes_1 = __importDefault(require("../routes/destinationRoutes"));
const tourRoutes_1 = __importDefault(require("../routes/tourRoutes"));
const reviewRoutes_1 = __importDefault(require("../routes/reviewRoutes"));
const cors_1 = __importDefault(require("cors"));
const swaggerConfig_1 = __importDefault(require("./swaggerConfig"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default));
app.use('/api/types', typeRoutes_1.default);
app.use('/api/country', countryRoutes_1.default);
app.use('/api/destinations', destinationRoutes_1.default);
app.use('/api/tours', tourRoutes_1.default);
app.use('/api/reviews', reviewRoutes_1.default);
exports.default = app;
