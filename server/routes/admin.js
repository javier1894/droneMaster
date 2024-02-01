var express = require("express");
var router = express.Router();
const adminControllers = require("../controllers/adminControllers");
const bcrypt = require("bcrypt");
const multer = require("../middleware/multer");

// 1.- Create newUser
// http://localhost:4000/admin/createUser
router.post("/createUser", adminControllers.createUser);

// 2.- View all teachers
// http://localhost:4000/admin/allTeachers
router.get("/allTeachers", adminControllers.selectAllTeachers);

// 3.- View all students
// http://localhost:4000/admin/allStudents
router.get("/allStudents", adminControllers.selectAllStudents);

// 4.- Enable comment
// http://localhost:4000/admin/enableComment/:comment_id
router.put("/enableComment/:comment_id", adminControllers.enableComment);

// 5.- Disable comment
// http://localhost:4000/admin/disableComment/:comment_id
router.put("/disableComment/:comment_id", adminControllers.disableComment);

// 6.- Enable User
// http://localhost:4000/admin/enableUser/:user_id
router.put("/enableUser/:user_id", adminControllers.enableUser);

// 7.- Disable User
// http://localhost:4000/admin/disableUser/:user_id
router.put("/disableUser/:user_id", adminControllers.disableUser);

// 8.- Passed course
// localhost:4000/admin/passedCourse/:user_id
router.put("/passedCourse/:user_id/:course_id", adminControllers.passedCourse);

// 9.- Not passed course
// localhost:4000/admin/notPassedCourse/:user_id
router.put(
  "/notPassedCourse/:user_id/:course_id",
  adminControllers.notPassedCourse
);

// 10.- view All Courses (admin)
// http://localhost:4000/admin/allCourses
router.get("/allCourses", adminControllers.viewAllCourses);

// 11.- Create Lesson (admin)
// http://localhost:4000/admin/createLesson/:course_id/:unit_id
router.post("/createLesson/:course_id/:unit_id", adminControllers.createLesson);

// 12.- Create Lesson (admin)
// http://localhost:4000/admin/createUnit/:course_id
router.post("/createUnit/:course_id", adminControllers.createUnit);

// 13.- Create Resource (admin & teacher)
// http://localhost:4000/admin/createResource/:user_id/:lesson_id
router.post(
  "/createResource/:user_id/:lesson_id",
  multer("resources"),
  adminControllers.createResource
);

// 14.- Select all units, lessons and resource from a course
// http://localhost:4000/admin/courseInfo
router.get("/courseInfo", adminControllers.ViewCourseInfo);

// 15.- Delete a Tag from a course
// http://localhost:4000/admin/deleteCourseTag/:tag_id/:course_id
router.put(
  "/deleteCourseTag/:tag_id/:course_id",
  adminControllers.deleteTagCourse
);

// 16.- Start dates
// http://localhost:4000/admin/inscriptionDates
router.get("/inscriptionDates", adminControllers.viewInscriptionDates);

// 17.- Delete resource into a lesson
// http://localhost:4000/admin/deleteResource/:resource_id/:lesson_id
router.delete(
  "/deleteResource/:resource_id/:lesson_id",
  adminControllers.deleteResource
);

// 18.- EditLesson
// http://localhost:4000/admin/editLesson/:course_id/:unit_id/:lesson_id
router.put(
  "/editLesson/:course_id/:unit_id/:lesson_id",
  adminControllers.editLesson
);

// 19.- EditUnit
// http://localhost:4000/admin/editUnit/:course_id/:unit_id
router.put("/editUnit/:course_id/:unit_id", adminControllers.editUnit);

module.exports = router;
