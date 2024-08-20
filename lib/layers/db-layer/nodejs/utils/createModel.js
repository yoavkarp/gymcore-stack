"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const createModel = (modelName) => {
    return (tenantId, conn = mongoose_1.default.connection) => {
        return conn.models[`${modelName}_${tenantId}`] || conn.model(`${modelName}_${tenantId}`);
    };
};
exports.createModel = createModel;
