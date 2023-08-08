import e, { Request, Response } from "express";
import { Connection, QueryError } from "mysql2";
import { VerifyUser, Login, Register, JwtLogin } from "./auth.service";
import { ZodError, z } from "zod";
import jwt from "jsonwebtoken";
import { AuthError } from "./AuthError";
export async function login(req: Request, res: Response) {
  try {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*?&])[a-z\d@$!.%*?&]+$/),
    });
    const connection: Connection = req.app.get("connection");
    const { email, password } = loginSchema.parse(req.body);
    const { id, profile, role, username } = (await Login(
      connection,
      email,
      password
    )) as {
      id: number;
      email: string;
      password: string;
      profile: null;
      username: string;
      role: "user";
    };
    const token = jwt.sign({ id, email, role }, process.env.TOKEN_SECRET!, {
      expiresIn: "1800s",
    });
    res.cookie("auth-token", token, {
      maxAge: 3600000,
      path: "/",
      secure: false,
      domain: "localhost",
    });
    return res.send({ id, profile, role, username, email });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error);
    } else if (error instanceof AuthError) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error);
    }
  }
}
export async function register(req: Request, res: Response) {
  try {
    const registerSchema = z.object({
      email: z.string().email(),
      password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*?&])[a-z\d@$!.%*?&]+$/),
    });
    const connection: Connection = req.app.get("connection");
    const { email, password } = registerSchema.parse(req.body);
    await Register(connection, email, password);
    return res.status(201).send("success");
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error);
    } else if (error instanceof AuthError) {
      res.status(400).send(error.message);
    } else {
      res.send(500).send(error);
    }
  }
}

export async function verifyUser(req: Request, res: Response) {
  const { id } = req.body;
  console.log(id);
  const _connection = req.app.get("connection") as Connection;
  const _result = await VerifyUser(_connection, id);
  const token = jwt.sign({ ..._result.success, role: "user" }, "my secret");
  return res.send({ ..._result.success, token, role: "user" });
}

export function testJwt(req: Request, res: Response) {
  const token = req.headers["authorization"];
  if (token) {
    const isValid = jwt.verify(token, "my secret");
    console.log(isValid);
    return res.send(isValid);
  }
  return res.send("jwt required");
}

export async function jwtLogin(req: Request, res: Response) {
  try {
    const emailSchema = z.object({ email: z.string().email() });
    const connection: Connection = req.app.get("connection");
    const { email } = emailSchema.parse(req.body);
    const _result = await JwtLogin(connection, email);
    return res.send(_result);
  } catch (error) {}
}
