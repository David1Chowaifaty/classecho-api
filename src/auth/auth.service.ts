import { Connection } from "mysql2";
import User from "../types/User";
import Model from "../types/Model";
import bcrypt from "bcrypt";
import { AuthError } from "./AuthError";

export function Login(connection: Connection, email: string, password: string) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM Users WHERE email = ?",
      [email],
      async (error, result) => {
        if (error) {
          reject(error);
        } else {
          const res = result as User[];
          if (res.length === 0) {
            reject(new AuthError("[Email-Error]: Invalid Email"));
          } else {
            const passwordMatch = await bcrypt.compare(
              password,
              res[0].password
            );
            if (passwordMatch) {
              resolve(res[0]);
            } else {
              reject(new AuthError("[Password-Error]: Invalid Password"));
            }
          }
        }
      }
    );
  });
}

export function Register(
  connection: Connection,
  email: string,
  password: string
) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (hashError, _hashedPassword) => {
      if (hashError) {
        reject(hashError);
      } else {
        connection.query(
          "INSERT INTO Users (email, password) VALUES (?, ?)",
          [email, _hashedPassword],
          (error, result) => {
            if (error) {
              if (error.code === "ER_DUP_ENTRY") {
                reject(new AuthError("[Email-Error]=Email already exist"));
              } else {
                reject(error);
              }
            } else {
              resolve(result);
            }
          }
        );
      }
    });
  });
}

export function VerifyUser(connection: Connection, id: string): Promise<Model> {
  return new Promise((resolve, reject) => {
    connection.query(
      "select email,id,profile,username as name from Users where id=?",
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          const res = result as any[];
          resolve({ success: res[0] });
        }
      }
    );
  });
}
export function JwtLogin(connection: Connection, email: string) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT id,email,profile,username as name FROM Users WHERE email = ?",
      [email],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          const res = result as any[];
          if (res.length === 0) {
            reject();
          }
          resolve(res[0]);
        }
      }
    );
  });
}
