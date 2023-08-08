import { Router } from "express";
import {
  addComment,
  getAllComments,
  reply,
  deleteComment,
  like,
} from "../comment/comment.controller";

export const commentRouter = Router();

commentRouter.post("/api/comment/addComment", addComment);
commentRouter.get("/api/comment/getAllComments/:id", getAllComments);
commentRouter.get("/api/comment/reply", reply);
commentRouter.post("/api/comment/deleteComment", deleteComment);
commentRouter.post("/api/comment/likeComment", like);
