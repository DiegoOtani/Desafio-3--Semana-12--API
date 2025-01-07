"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const swaggerConfig_1 = __importDefault(require("../config/swaggerConfig"));
fs_1.default.writeFileSync('src/swagger/swagger-output.json', JSON.stringify(swaggerConfig_1.default, null, 2));
console.log('Swagger file generated: swagger-output.json');
