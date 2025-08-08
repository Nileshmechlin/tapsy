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
exports.verifyEmailOtp = exports.getUserById = exports.login = exports.updateUser = exports.createUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key';
const createUser = (userType) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.create({
        data: { userType, lastCompletedStep: 1 },
    });
    return user;
});
exports.createUser = createUser;
const updateUser = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.user.update({
            where: { id },
            data: updates,
            include: { businessDetails: true },
        });
    }
    catch (error) {
        throw new AppError_1.default('Failed to update user', 500, { originalError: error });
    }
});
exports.updateUser = updateUser;
const login = (loginId, deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findFirst({
        where: {
            OR: [{ email: loginId }, { mobileNumber: loginId }],
        },
    });
    if (!user) {
        throw new AppError_1.default('User not found', 404);
    }
    if (user.deviceId && user.deviceId !== deviceId) {
        // In a real app, you might want to notify the user
        // that a new device has logged in.
        console.log(`User ${user.id} logged in from a new device. Old device ID: ${user.deviceId}, New device ID: ${deviceId}`);
    }
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    yield db_1.default.user.update({
        where: { id: user.id },
        data: {
            refreshToken,
            deviceId,
            lastLogin: new Date(),
        },
    });
    return { accessToken, refreshToken, user };
});
exports.login = login;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findUnique({ where: { id }, include: { businessDetails: true } });
    if (!user) {
        throw new AppError_1.default('User not found', 404);
    }
    return user;
});
exports.getUserById = getUserById;
const verifyEmailOtp = (userId, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new AppError_1.default('User not found', 404);
    }
    if (user.otp !== otp) {
        throw new AppError_1.default('Invalid OTP', 400);
    }
    if (user.otpExpires && user.otpExpires < new Date()) {
        throw new AppError_1.default('OTP has expired', 400);
    }
    return db_1.default.user.update({
        where: { id: userId },
        data: {
            status: 'VERIFIED',
            otpVerified: true,
            otp: null,
            otpExpires: null,
        },
    });
});
exports.verifyEmailOtp = verifyEmailOtp;
