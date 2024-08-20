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
exports.main = void 0;
const fnMap = {};
const main = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const fn = fnMap[event.info.fieldName];
    if (!fn) {
        return callback(new Error(`No function found for ${event.info.parentTypeName}.${event.info.fieldName}`));
    }
    try {
        return fn(event, context, callback);
    }
    catch (err) {
        return callback(err);
    }
});
exports.main = main;
