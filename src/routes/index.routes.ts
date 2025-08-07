import {Router} from "express";
import userRouter from "./user.routes";
const mainRouter = Router();

mainRouter.use("/auth",userRouter);

export default mainRouter;