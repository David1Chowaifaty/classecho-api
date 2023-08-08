import { Request, Response } from "express";
import { Connection } from "mysql2";
import { GetAllUsersId } from "./users.service";

export async function getAllUsersId(req: Request, res: Response) {
  try {
    const connection: Connection = req.app.get("connection");
    const result = await GetAllUsersId(connection);
    return res.send(result.success.map((user: any) => user.id));
  } catch (error) {
    return res.status(500).send(error);
  }
}
