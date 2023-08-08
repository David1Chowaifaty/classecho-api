import { Request, Response } from "express";
import { Connection } from "mysql2";
import { ZodError, z } from "zod";
import { addCommentModel, replyModel } from "./comment.service";
/*TODO: all the methods */
export async function addComment(req: Request, res: Response) {
  try {
    const commentSchema = z.object({
      message: z.string().nonempty().max(500),
      user_id: z.string().nonempty(),
      course_id: z.string().nonempty(),
    });
    const connection = req.app.get("connection") as Connection;
    const { message, user_id, course_id } = commentSchema.parse(req.body);
    const _result = await addCommentModel(
      connection,
      message,
      user_id,
      course_id
    );
    return res.send(_result);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error.message);
    }
    return res.status(500).send(error);
  }
}
export async function getAllComments(req: Request, res: Response) {}
export async function reply(req: Request, res: Response) {
  try {
    const commentSchema = z.object({
      message: z.string().nonempty().max(500),
      user_id: z.string().nonempty(),
      comment_id: z.string().nonempty(),
    });
    const connection = req.app.get("connection") as Connection;
    const { message, user_id, comment_id } = commentSchema.parse(req.body);
    const _result = await replyModel(connection, message, user_id, comment_id);
    return res.send(_result);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error.message);
    }
    return res.status(500).send(error);
  }
}
export async function deleteComment(req: Request, res: Response) {}
export async function like(req: Request, res: Response) {}
