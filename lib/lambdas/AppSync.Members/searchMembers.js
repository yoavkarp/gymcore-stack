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
exports.searchMembers = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dynamodb = new aws_sdk_1.default.DynamoDB.DocumentClient();
const searchMembers = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, limit } = event.arguments;
    const { Items } = yield dynamodb.scan({
        TableName: process.env.MembersTableName,
        Limit: limit || 10,
        FilterExpression: "contains(#name, :query) OR contains(#email, :query) OR contains(#phoneNumber, :query)",
        ExpressionAttributeNames: {
            "#name": "name",
            "#email": "email",
            "#phoneNumber": "phoneNumber"
        },
        ExpressionAttributeValues: {
            ":query": query
        }
    }).promise();
    return callback(undefined, Items);
});
exports.searchMembers = searchMembers;
