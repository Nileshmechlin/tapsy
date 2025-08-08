"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const welcome_controller_1 = require("../controllers/welcome.controller");
const welcomeRouter = (0, express_1.Router)();
welcomeRouter.get('/welcome', welcome_controller_1.getWelcomeData);
exports.default = welcomeRouter;
