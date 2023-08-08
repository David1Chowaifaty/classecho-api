import { Connection } from "mysql2";
import Model from "../types/Model";
import { generateCode } from "../lib/utils";

export function AddCourse(
  connection: Connection,
  id: string,
  name: string,
  description: string
): Promise<Model> {
  return new Promise((reslove, reject) => {
    connection.query(
      "INSERT INTO Course (creator, course_name, createdAt, description,course_code) VALUES (?, ?, ?, ?,?)",
      [id, name, new Date(), description, generateCode()],
      (error, results) => {
        if (error) {
          reject(error);
        }
        reslove({ success: results });
      }
    );
  });
}

export function GetCourses(connection: Connection, id: string): Promise<Model> {
  return new Promise((reslove, reject) => {
    connection.query(
      `SELECT Course.course_id, Course.creator, Course.course_name, Course.description, Course.course_code
          FROM Course
          WHERE Course.creator = ? or Course.course_code in (select course_code from Enrollments where student_id=?) ;
          `,
      [id, id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        reslove({ success: result });
      }
    );
  });
}

export function GetSingleCourse(
  connection: Connection,
  id: string
): Promise<Model> {
  return new Promise((reslove, reject) => {
    connection.query(
      `SELECT * FROM CourseMaterialView WHERE course_id = ?`,
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        reslove({ success: result });
      }
    );
  });
}

export function Enroll(
  connection: Connection,
  id: string,
  code: string
): Promise<Model> {
  return new Promise((reslove, reject) => {
    connection.query(
      `INSERT INTO Enrollments (
        student_id,
        enrolled,
        course_code) values(?,?,?);`,
      [id, new Date(), code],
      (err, result) => {
        if (err) {
          reject(err);
        }
        reslove({ success: result });
      }
    );
  });
}

export function GetEnrolledStudents(
  connection: Connection,
  code: string
): Promise<Model> {
  return new Promise((reslove, reject) => {
    connection.query(
      `select u.email,u.profile,e.id as enrollment_id
      from Users u
      join Enrollments e on e.student_id=u.id
      where e.course_code=?;`,
      [code],
      (error, results) => {
        if (error) {
          reject(error);
        }
        reslove({ success: results });
      }
    );
  });
}

export function LeaveCourse(
  connection: Connection,
  id: string
): Promise<Model> {
  return new Promise((reslove, reject) => {
    connection.query(
      `delete from Enrollments where student_id=?`,
      [id],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return reslove({ success: result });
      }
    );
  });
}

export function DeleteCourse(
  connection: Connection,
  course_code: string
): Promise<Model> {
  return new Promise((reslove, reject) => {
    connection.beginTransaction((err) => {
      if (err) {
        reject("Error starting the transaction");
      }
      connection.query(
        "delete from Enrollments where course_code=?",
        [course_code],
        (err) => {
          if (err) {
            connection.rollback(() => {
              return reject("Error deleting from enrollments");
            });
          }
        }
      );
      connection.query(
        "delete from Course where course_code=?",
        [course_code],
        (err) => {
          if (err) {
            connection.rollback(() => {
              reject("Error deleting from course");
            });
          }
        }
      );
      connection.commit((err) => {
        if (err) {
          connection.rollback(() => {
            return reject("Error committing the transaction");
          });
        }

        return reslove({ success: "Transaction completed successfully" });
      });
    });
  });
}

export function RemoveEnrolledStudent(
  connection: Connection,
  enrollment_id: string
): Promise<Model> {
  return new Promise((reslove, reject) => {
    connection.query(
      `delete from Enrollments where id=?`,
      [enrollment_id],
      (error, result) => {
        if (error) {
          reject(error);
        }
        reslove({ success: result });
      }
    );
  });
}

export function AddMaterial(
  connection: Connection,
  title: string,
  description: string,
  course_id: string
): Promise<Model> {
  return new Promise((reslove, reject) => {
    connection.query(
      "INSERT INTO Material (title, material_description, course_id) VALUES (?, ?, ?)",
      [title, description, course_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        reslove({ success: results });
      }
    );
  });
}

export function GetAllCoursesId(connection: Connection): Promise<Model> {
  return new Promise((reslove, reject) => {
    connection.query("SELECT course_id FROM Course", (error, results) => {
      if (error) {
        reject(error);
      }
      reslove({ success: results });
    });
  });
}
