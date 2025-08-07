import {Router} from "express";
import userRouter from "./user.routes";
import businessRouter from "./business.routes";
const mainRouter = Router();

mainRouter.use("/auth",userRouter);
mainRouter.use("/business",businessRouter);

export default mainRouter;