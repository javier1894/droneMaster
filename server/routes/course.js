var express = require("express");
var router = express.Router();
const multer = require("../middleware/multer");
const courseControllers = require("../controllers/courseControllers");
const verify = require("../middleware/verify");

// 1. Create a course by admin
// http://localhost:4000/courses/createCourse/:user_id
router.post("/createCourse/:user_id", courseControllers.createCourse);

// 2. Enable Course
// http://localhost:4000/courses/enableCourse/:course_id
router.put("/enableCourse/:course_id", courseControllers.enableCourse);

// 3. Disable Course
// http://localhost:4000/courses/disableCourse/:course_id
router.put("/disableCourse/:course_id", courseControllers.disableCourse);

// 4.- All courses
// http://localhost:4000/courses/allCourses
router.get("/allCourses", courseControllers.selectAllCourses);

// 5.- Edit course
// http://localhost:4000/courses/editCourse/:course_id/:teacherPrev_id
router.put(
  "/editCourse/:course_id/:teacherPrev_id",
  courseControllers.editCourse
);

// 6.- Create course category
// http://localhost:4000/courses/createCategory
router.post("/createCategory/", courseControllers.createCategory);

// 7.- Get all categories (NOT EMPTY)
// http://localhost:4000/courses/allCategories
router.get("/allCategories", courseControllers.selectAllCourseCategories);

// 8.- Get all tags of a Course
// http://localhost:4000/courses/courseTags/:course_id
router.get("/courseTags/:course_id", courseControllers.selectAllCourseTags);

// 9.- Suscribe into a course
// http://localhost:4000/courses/payACourse/:user_id/:course_id
router.post(
  "/payACourse/:user_id/:course_id/:price",
  courseControllers.suscribeIntoACourse
);

// 10.- Get info for course edition info
// http://localhost:4000/courses/courseInfoEdition/:course_id
router.get(
  "/courseInfoEdition/:course_id",
  courseControllers.selectCourseEditionInfo
);

// 11.- Uplaod course image
// http://localhost:4000/courses/uploadCourseImage/:course_id
router.put(
  "/uploadCourseImage/:course_id",
  multer("courses"),
  courseControllers.uploadCourseImage
);

// 12.- Get info of a course
// http://localhost:4000/courses/courseInfo/:course_id
router.get("/courseInfo/:course_id", courseControllers.selectCourseInfo);

// 13.- Get info of a lesson from a course
// http://localhost:4000/courses/courseInfo/lessonInfo/:course_id/:unit_id/:lesson_id
router.get(
  "/courseInfo/lessonInfo/:course_id/:unit_id/:lesson_id",
  courseControllers.selectLessonInfo
);

// 14.- Get all categories
// http://localhost:4000/courses/everyCategories
router.get("/everyCategories", courseControllers.selectEveryCourseCategories);

module.exports = router;
