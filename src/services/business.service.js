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
exports.updateBusinessDetails = void 0;
const db_1 = __importDefault(require("../config/db"));
const mailer_1 = require("../utils/mailer");
const AppError_1 = __importDefault(require("../utils/AppError"));
const updateBusinessDetails = (userId, details) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.default.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new AppError_1.default('User not found', 404);
    }
    let businessDetails;
    if (user.businessDetailsId) {
        businessDetails = yield db_1.default.businessDetails.update({
            where: { id: user.businessDetailsId },
            data: details,
        });
    }
    else {
        businessDetails = yield db_1.default.businessDetails.create({
            data: Object.assign(Object.assign({}, details), { userId }),
        });
        yield db_1.default.user.update({
            where: { id: userId },
            data: { businessDetailsId: businessDetails.id },
        });
    }
    if (details.email) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
        yield db_1.default.user.update({
            where: { id: userId },
            data: { otp, otpExpires },
        });
        try {
            yield (0, mailer_1.sendOtpEmail)(details.email, otp);
        }
        catch (error) {
            throw new AppError_1.default('Failed to send OTP email', 500, { originalError: error });
        }
    }
    return db_1.default.user.findUnique({
        where: { id: userId },
        include: { businessDetails: true },
    });
});
exports.updateBusinessDetails = updateBusinessDetails;
