import Model from "@/types/Model";
import { Connection } from "mysql2";

export async function GetAllUsersId(connection: Connection): Promise<Model> {
  return new Promise((reslove, reject) => {
    connection.query("SELECT id FROM Users", (error, results) => {
      if (error) {
        reject(error);
      }
      reslove({ success: results });
    });
  });
}
