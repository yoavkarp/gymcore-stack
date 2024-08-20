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
exports.inviteMember = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const nodejs_1 = require("@/layers/db-layer/nodejs");
const mongoose_1 = __importDefault(require("mongoose"));
let conn;
const cognito = new aws_sdk_1.default.CognitoIdentityServiceProvider();
const uri = process.env.MONGODB_URI || "";
const connect = function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (conn == null) {
            conn = mongoose_1.default.createConnection(uri, {
                serverSelectionTimeoutMS: 5000
            });
            // `await`ing connection after assigning to the `conn` variable
            // to avoid multiple function calls creating new connections
            yield conn.asPromise();
        }
        return conn;
    });
};
const inviteMember = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    context.callbackWaitsForEmptyEventLoop = false;
    const { input: { email, name, phoneNumber } } = event.arguments;
    // define username
    const Username = phoneNumber;
    const user = yield cognito.adminCreateUser({
        UserPoolId: process.env.USER_POOL_ID,
        Username,
        TemporaryPassword: "12345678",
        UserAttributes: [
            {
                Name: 'email', // Specify the attribute name (e.g., email, phone_number, etc.)
                Value: email // Specify the attribute value
            },
            {
                Name: 'phone_number',
                Value: phoneNumber
            },
            {
                Name: 'name',
                Value: name
            },
            {
                Name: "email_verified",
                Value: "true"
            },
            {
                Name: "phone_number_verified",
                Value: "true"
            }
        ]
    }).promise();
    yield cognito.adminAddUserToGroup({
        Username,
        UserPoolId: process.env.USER_POOL_ID,
        GroupName: "invited"
    }).promise();
    const userId = (_c = (_b = (_a = user.User) === null || _a === void 0 ? void 0 : _a.Attributes) === null || _b === void 0 ? void 0 : _b.find(attr => attr.Name === "sub")) === null || _c === void 0 ? void 0 : _c.Value;
    const UserModel = (0, nodejs_1.getUserModel)(new mongoose_1.default.Types.ObjectId(process.env.tenantId), conn);
    const UserItem = new UserModel({
        name,
        email,
        phoneNumber,
        role: "invited",
        userId,
        address: "",
        clubs: []
    });
    return callback(undefined, UserItem);
});
exports.inviteMember = inviteMember;
