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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const nodejs_1 = require("@/layers/db-layer/nodejs");
const cognito = new aws_sdk_1.default.CognitoIdentityServiceProvider();
let conn;
const deleteMember = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    context.callbackWaitsForEmptyEventLoop = false;
    if (!conn) {
        conn = (yield (0, nodejs_1.connectToDatabase)()).connection;
    }
    return callback(undefined, {
        id: "",
        createdAt: String(Boolean(conn)),
        email: "",
        name: "",
        phoneNumber: "",
        status: "",
        updatedAt: ""
    });
});
exports.deleteMember = deleteMember;
