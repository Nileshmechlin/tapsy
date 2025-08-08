"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use("/api", index_routes_1.default);
app.get("/", (_req, res) => {
    res.send("Tapsy Backend is running!");
});
app.use(globalErrorHandler_1.default);
exports.default = app;
