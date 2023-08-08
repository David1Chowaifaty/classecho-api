import { Router } from "express";
import {
  jwtLogin,
  login,
  register,
  testJwt,
  verifyUser,
} from "../auth/auth.controller";

export const authRouter = Router();

authRouter.post("/api/auth/login", login);
authRouter.post("/api/auth/register", register);
authRouter.post("/api/auth/verifyUser", verifyUser);
authRouter.post("/api/auth/jwtlogin", jwtLogin);
authRouter.get("/api/auth/testjwt", testJwt);
