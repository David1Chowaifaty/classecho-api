import { Router } from "express";
import {
  addCourse,
  getCourses,
  getSingleCourse,
  addMaterial,
  enroll,
  getEnrolledStudents,
  deleteCourse,
  removeEnrolledStudent,
  leaveCourse,
  getAllCoursesId,
} from "../course/course.controller";

export const courseRouter = Router();

courseRouter.post("/api/course/addCourse", addCourse);
courseRouter.get("/api/course/getCourses/:id", getCourses);
courseRouter.get("/api/course/getCourses/:id", getCourses);
courseRouter.get("/api/course/getAllCoursesId", getAllCoursesId);
courseRouter.get("/api/course/getSingleCourse/:id", getSingleCourse);
courseRouter.post("/api/course/addMaterial", addMaterial);
courseRouter.post("/api/course/joinCourse", enroll);
courseRouter.get("/api/course/getEnrolledStudents/:code", getEnrolledStudents);
courseRouter.delete("/api/course/deleteCourse/:course_code", deleteCourse);
courseRouter.delete(
  "/api/course/removeEnrolledStudent/:enrollment_id",
  removeEnrolledStudent
);
courseRouter.post("/api/course/leaveCourse", leaveCourse);
