import { Connection } from "mysql2";

export async function addCommentModel(
  connection: Connection,
  message: string,
  user_id: string,
  course_id: string
) {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        `INSERT INTO Comment(message, user_id, course_id,createdAt) VALUES(?,?,?,?)`,
        [message, user_id, course_id, new Date()],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}
export async function getAllCommentsModel() {}
export async function replyModel(
  connection: Connection,
  message: string,
  user_id: string,
  comment_id: string
) {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        `INSERT INTO Reply(message, user_id,comment_id,createdAt) VALUES(?,?,?,?)`,
        [message, user_id, comment_id, new Date()],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}
export async function deleteCommentModel() {}
export async function likeModel() {}
