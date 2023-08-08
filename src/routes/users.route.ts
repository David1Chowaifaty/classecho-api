import { Router } from "express";
import { getAllUsersId } from "../users/users.controller";

export const userRouter = Router();

userRouter.get("/api/users/GetAllUsersId", getAllUsersId);
