const connection = require("../config/db");

class teacherControllers {
  // 1.- Get all students (not deleted) of a teacher
  // http://localhost:4000/teachers/myStudents/:user_i
  selectMyStudents = (req, res) => {
    const { user_id } = req.params;

    let sql = `SELECT DISTINCT user.user_id AS student_id, user.user_name AS student_name, user.user_lastname AS student_lastname, user.email AS student_email,user.phone AS student_phone, user.user_img AS student_img FROM user JOIN user_course ON user.user_id = user_course.user_id WHERE user.type = 0 AND user.is_deleted = 0 AND user_course.course_id IN (SELECT course_id FROM user_course WHERE user_id = ${user_id})`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 2.- Count all students (not deleted) and UNITS of a course
  // http://localhost:4000/teachers/myCourses/studentCounter/:user_id
  countMyStudentsFromCourse = (req, res) => {
    const { user_id } = req.params;

    let sql = `SELECT course.course_id, COUNT(DISTINCT unit.unit_id) AS num_units, COUNT(DISTINCT user2.user_id) AS num_students FROM user_course JOIN course ON user_course.course_id = course.course_id LEFT JOIN unit ON course.course_id = unit.course_id LEFT JOIN user_course user_course2 ON course.course_id = user_course2.course_id LEFT JOIN user user2 ON user_course2.user_id = user2.user_id AND user2.type = 0 WHERE user_course.user_id = ${user_id} GROUP BY course.course_id`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 3.- Select all students (not deleted and type 0), user_starting date and user status (STATS) of a course
  // http://localhost:4000/teachers/myCourses/students/:course_id
  selectMyStudentsFromCourse = (req, res) => {
    const { course_id } = req.params;

    let sql = `SELECT user.user_id, user.user_name, user.user_lastname, user.phone, user.email, user_course.status, user_course.start_date FROM user INNER JOIN user_course ON user.user_id = user_course.user_id WHERE user.type = 0 AND user.is_deleted = 0 AND user_course.course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 4.- Select all units, lessons and resource from a course
  // http://localhost:4000/teachers/myCourses/courseInfo/:course_id
  selectMyCourseInfo = (req, res) => {
    const { course_id } = req.params;

    let sql = `SELECT course.score AS course_score, course.course_id, course.exam_file, unit.unit_id, unit.unit_is_hidden, lesson.lesson_id, lesson.lesson_is_hidden, resource.resource_id, resource.resource_is_hidden, course.course_name, unit.unit_tittle, lesson.lesson_title FROM course LEFT JOIN unit ON course.course_id = unit.course_id LEFT JOIN lesson ON unit.course_id = lesson.course_id AND unit.unit_id = lesson.unit_id LEFT JOIN resource ON lesson.resource_id = resource.resource_id WHERE course.course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 5.- Select all inscription Dates of a course
  // http://localhost:4000/teachers/myCourses/inscriptionDates/:course_id
  selectMyCourseInsciptions = (req, res) => {
    const { course_id } = req.params;

    let sql = `SELECT start_date FROM user_course WHERE user_id IN ( SELECT user_id FROM user WHERE type = 0 ) AND course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 6.- Download student exam to review
  // http://localhost:4000/teachers/examName/:user_id/:course_id
  getExamName = (req, res) => {
    const { user_id, course_id } = req.params;

    let sql = `SELECT student_exam_file FROM student_exam WHERE user_id = ${user_id} AND course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 8.- Delete resource into a lesson uploaded by a teachers
  // http://localhost:4000/teachers/deleteResource/:user_id/:resource_id/:lesson_id
  deleteTeacherResource = (req, res) => {
    const { user_id, resource_id, lesson_id } = req.params;

    let sql1 = `UPDATE lesson SET resource_id = null WHERE lesson_id = ${lesson_id}`;

    connection.query(sql1, (error, result1) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        let sql2 = `DELETE FROM resource WHERE resource_id = ${resource_id} AND created_by_user_id = ${user_id}`;

        connection.query(sql2, (error, result2) => {
          error
            ? res.status(400).json({ error })
            : res.status(200).json(result2);
        });
      }
    });
  };

  // 9.- Select all resource uploaded by a teacher
  // http://localhost:4000/teachers/teacherResources/:user_id
  selectAllTeacherResources = (req, res) => {
    const { user_id } = req.params;

    let sql = `SELECT resource_id FROM resource WHERE created_by_user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 10.- Upload course examName
  // http://localhost:4000/teachers/uploadCourseExam/:course_id
  uploadCourseExam = (req, res) => {
    const { course_id } = req.params;
    let exam_file = req.file.filename;

    let sql = `UPDATE course SET exam_file = "${exam_file}" WHERE course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 11.- Get teacher email
  // http://localhost:4000/teachers/teacherEmail/:course_id
  getTeacherEmail = (req, res) => {
    const { course_id } = req.params;

    let sql = `SELECT user.email FROM user JOIN user_course ON user.user_id = user_course.user_id AND user_course.course_id = ${course_id} AND user.type = 1 ORDER BY user_course.start_date DESC`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new teacherControllers();
