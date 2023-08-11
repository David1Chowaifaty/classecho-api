import { Request, Response } from "express";
import { Connection } from "mysql2";
import {
  GetAllCoursesId,
  AddCourse,
  AddMaterial,
  DeleteCourse,
  Enroll,
  GetCourses,
  GetEnrolledStudents,
  GetSingleCourse,
  LeaveCourse,
  RemoveEnrolledStudent,
} from "./course.service";
import { z } from "zod";

const stringValidator = z.string();

export async function addCourse(req: Request, res: Response) {
  try {
    const connection = req.app.get("connection") as Connection;
    const addCourseSchema = z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
    });
    const { id, name, description } = addCourseSchema.parse(req.body);
    const _result = await AddCourse(connection, id, name, description);
    if (_result.error) {
      return res.status(405).send(_result.error);
    }
    return res.send(_result.success);
  } catch (error) {
    return res.status(405).send(error);
  }
}

export async function getCourses(req: Request, res: Response) {
  try {
    const startTime = Date.now();
    const connection = req.app.get("connection") as Connection;
    const id = stringValidator.parse(req.params.id);
    const _result = await GetCourses(connection, id);
    const endTime = Date.now();
    const totalTime = endTime - startTime;

    res.setHeader("X-Total-Time", totalTime);
    return res.send(_result.success);
  } catch (error) {
    return res.status(405).send(error);
  }
}
export async function enroll(req: Request, res: Response) {
  try {
    const connection = req.app.get("connection") as Connection;
    const enrollSchema = z.object({
      id: z.string(),
      code: z.string(),
    });
    const { id, code } = enrollSchema.parse(req.body);
    const _result = await Enroll(connection, id, code);
    return res.send(_result.success);
  } catch (error) {
    return res.status(405).send(error);
  }
}

export async function getSingleCourse(req: Request, res: Response) {
  try {
    const connection = req.app.get("connection") as Connection;
    const id = stringValidator.parse(req.params.id);
    const _result = await GetSingleCourse(connection, id);
    return res.send(_result.success);
  } catch (error) {
    return res.status(405).send(error);
  }
}
export async function getEnrolledStudents(req: Request, res: Response) {
  try {
    const code = stringValidator.parse(req.params.code);
    const connection = req.app.get("connection") as Connection;
    const _result = await GetEnrolledStudents(connection, code);
    return res.send(_result.success);
  } catch (error) {
    return res.status(405).send(error);
  }
}
export async function leaveCourse(req: Request, res: Response) {
  try {
    const scheme = z.object({
      id: z.coerce.number(),
      course_code: z.string(),
    });
    const connection = req.app.get("connection") as Connection;
    const { id, course_code } = scheme.parse(req.body.id);
    const _result = await LeaveCourse(connection, id, course_code);
    return res.send(_result.success);
  } catch (error) {
    return res.status(405).send(error);
  }
}
export async function deleteCourse(req: Request, res: Response) {
  try {
    const course_code = stringValidator.parse(req.params.course_code);
    const connection = req.app.get("connection") as Connection;
    const _result = await DeleteCourse(connection, course_code);
    return res.send(_result.success);
  } catch (error) {
    return res.status(405).send(error);
  }
}
export async function removeEnrolledStudent(req: Request, res: Response) {
  try {
    const connection = req.app.get("connection") as Connection;
    const enrollment_id = stringValidator.parse(req.params.enrollment_id);
    const _result = await RemoveEnrolledStudent(connection, enrollment_id);
    return res.send(_result.success);
  } catch (error) {
    return res.status(405).send(error);
  }
}
export async function addMaterial(req: Request, res: Response) {
  try {
    const addMaterialSchema = z.object({
      title: z.string(),
      description: z.string(),
      course_id: z.string(),
    });
    const connection = req.app.get("connection") as Connection;
    const { title, description, course_id } = addMaterialSchema.parse(req.body);
    const _result = await AddMaterial(
      connection,
      title,
      course_id,
      description
    );
    return res.send(_result.success);
  } catch (error) {
    return res.status(405).send(error);
  }
}

export async function getAllCoursesId(req: Request, res: Response) {
  try {
    const connection = req.app.get("connection") as Connection;
    const _result = await GetAllCoursesId(connection);
    return res.send(_result.success.map((course: any) => course.course_id));
  } catch (error) {
    return res.status(500).send(error);
  }
}
