"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const business_routes_1 = __importDefault(require("./business.routes"));
const userPersonalization_routes_1 = __importDefault(require("./userPersonalization.routes"));
const mainRouter = (0, express_1.Router)();
mainRouter.use("/auth", user_routes_1.default);
mainRouter.use("/business", business_routes_1.default);
mainRouter.use("/user-personalization", userPersonalization_routes_1.default);
exports.default = mainRouter;
