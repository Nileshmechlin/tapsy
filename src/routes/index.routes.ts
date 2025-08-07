import {Router} from "express";
import userRouter from "./user.routes";
import businessRouter from "./business.routes";
import userPersonalizationRouter from "./userPersonalization.routes";
const mainRouter = Router();

mainRouter.use("/auth",userRouter);
mainRouter.use("/business",businessRouter);
mainRouter.use("/user-personalization",userPersonalizationRouter);

export default mainRouter;