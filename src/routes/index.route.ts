import { Router } from "express";
import { authRouter } from "./auth.route";
import { courseRouter } from "./course.route";
import { commentRouter } from "./comment.route";
import { userRouter } from "./users.route";

export const routes = Router();
routes.use(authRouter);
routes.use(courseRouter);
routes.use(commentRouter);
routes.use(userRouter);
