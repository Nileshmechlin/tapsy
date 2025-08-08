"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.login = exports.verifyEmailOtp = exports.getUser = exports.updateUser = exports.registerUser = void 0;
const userService = __importStar(require("../services/user.service"));
const firebase_1 = require("../utils/firebase");
const AppError_1 = __importDefault(require("../utils/AppError"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userType } = req.body;
        if (!userType) {
            return next(new AppError_1.default('userType is required', 400));
        }
        if (userType !== 'INDIVIDUAL' && userType !== 'BUSINESS') {
            return next(new AppError_1.default('Invalid userType', 400));
        }
        const user = yield userService.createUser(userType);
        res.status(201).json({ status: 'success', data: user });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (updates.idToken) {
            const decoded = yield (0, firebase_1.verifyFirebaseToken)(updates.idToken);
            if (!decoded.phone_number) {
                return next(new AppError_1.default('Invalid Firebase token', 400));
            }
            updates.mobileNumber = decoded.phone_number;
            updates.otpVerified = true;
        }
        delete updates.idToken;
        delete updates.status;
        delete updates.userType;
        const updated = yield userService.updateUser(id, updates);
        res.json({ status: 'success', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userService.getUserById(id);
        res.json({ status: 'success', data: user });
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const verifyEmailOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { otp } = req.body;
        const updated = yield userService.verifyEmailOtp(id, otp);
        res.json({ status: 'success', data: updated });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyEmailOtp = verifyEmailOtp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { loginId, deviceId } = req.body;
        if (!loginId || !deviceId) {
            return next(new AppError_1.default('loginId and deviceId are required', 400));
        }
        const result = yield userService.login(loginId, deviceId);
        res.json({ status: 'success', data: result });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
