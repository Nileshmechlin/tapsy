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
exports.deleteUserPersonalization = exports.updateUserPersonalization = exports.getUserPersonalizationById = exports.getAllUserPersonalizations = exports.createUserPersonalization = void 0;
const db_1 = __importDefault(require("../config/db"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const createUserPersonalization = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.userPersonalization.create({
            data,
        });
    }
    catch (error) {
        throw new AppError_1.default('Failed to create user personalization', 500, { originalError: error });
    }
});
exports.createUserPersonalization = createUserPersonalization;
const getAllUserPersonalizations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.userPersonalization.findMany();
    }
    catch (error) {
        throw new AppError_1.default('Failed to fetch user personalizations', 500, { originalError: error });
    }
});
exports.getAllUserPersonalizations = getAllUserPersonalizations;
const getUserPersonalizationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const personalization = yield db_1.default.userPersonalization.findUnique({
        where: { id },
    });
    if (!personalization) {
        throw new AppError_1.default('User personalization not found', 404);
    }
    return personalization;
});
exports.getUserPersonalizationById = getUserPersonalizationById;
const updateUserPersonalization = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.userPersonalization.update({
            where: { id },
            data: updates,
        });
    }
    catch (error) {
        throw new AppError_1.default('Failed to update user personalization', 500, { originalError: error });
    }
});
exports.updateUserPersonalization = updateUserPersonalization;
const deleteUserPersonalization = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.userPersonalization.delete({
            where: { id },
        });
    }
    catch (error) {
        throw new AppError_1.default('Failed to delete user personalization', 500, { originalError: error });
    }
});
exports.deleteUserPersonalization = deleteUserPersonalization;
