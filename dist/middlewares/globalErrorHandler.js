"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const handleAppError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
        details: err.details || null,
    });
};
const handleGenericError = (err, res) => {
    res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Something went wrong',
        details: err.message,
    });
};
const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof AppError_1.default) {
        return handleAppError(err, res);
    }
    if (err instanceof Error) {
        return handleGenericError(err, res);
    }
    res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'An unexpected error occurred',
        details: null,
    });
};
exports.default = globalErrorHandler;
