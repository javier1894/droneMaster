var express = require("express");
var router = express.Router();
const multer = require("../middleware/multer");
const teacherControllers = require("../controllers/teacherControllers");

// 1.- Get all students (not deleted) of a teacher
// http://localhost:4000/teachers/myStudents/:user_id
router.get("/myStudents/:user_id", teacherControllers.selectMyStudents);

// 2.- Count all students (not deleted) of a course
// http://localhost:4000/teachers/myCourses/studentCounter/:user_id
router.get(
  "/myCourses/studentCounter/:user_id",
  teacherControllers.countMyStudentsFromCourse
);

// 3.- Select all students (not deleted and type 0), user_starting date and user status (STATS) of a course
// http://localhost:4000/teachers/myCourses/students/:course_id
router.get(
  "/myCourses/students/:course_id",
  teacherControllers.selectMyStudentsFromCourse
);

// 4.- Select all units, lessons and resource from a course
// http://localhost:4000/teachers/myCourses/courseInfo/:course_id
router.get(
  "/myCourses/courseInfo/:course_id",
  teacherControllers.selectMyCourseInfo
);

// 5.- Select all inscription Dates of a course
// http://localhost:4000/teachers/myCourses/inscriptionDates/:course_id
router.get(
  "/myCourses/inscriptionDates/:course_id",
  teacherControllers.selectMyCourseInsciptions
);

// 6.- Download student exam to review
// http://localhost:4000/teachers/examName/:user_id/:course_id
router.get("/examName/:user_id/:course_id", teacherControllers.getExamName);

// 8.- Delete resource into a lesson uploaded by a teachers
// http://localhost:4000/teachers/deleteResource/:user_id/:resource_id
router.delete(
  "/deleteResource/:user_id/:resource_id/:lesson_id",
  teacherControllers.deleteTeacherResource
);

// 9.- Select all resource uploaded by a teacher
// http://localhost:4000/teachers/teacherResources/:user_id
router.get(
  "/teacherResources/:user_id",
  teacherControllers.selectAllTeacherResources
);

// 10.- Upload course examName
// http://localhost:4000/teachers/uploadCourseExam/:course_id
router.put(
  "/uploadCourseExam/:course_id",
  multer("coursesExam"),
  teacherControllers.uploadCourseExam
);

// 11.- Get teacher email
// http://localhost:4000/teachers/teacherEmail/:course_id
router.get("/teacherEmail/:course_id", teacherControllers.getTeacherEmail);

module.exports = router;
