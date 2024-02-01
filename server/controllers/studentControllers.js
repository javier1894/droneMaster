const connection = require("../config/db");
const bcrypt = require("bcrypt");

class studentControllers {
  // 1.- Register student: Gets the information from the register form and creates and new student
  // http://localhost:4000/students/registerStudent
  registerStudent = (req, res) => {
    const { user_name, user_lastname, email, password } = req.body;

    let saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        err && res.status(401).json({ err });

        let sql = `INSERT INTO user (user_name, user_lastname, email, password) VALUES ("${user_name}", "${user_lastname}", "${email}", "${hash}")`;

        connection.query(sql, (error, result) => {
          error
            ? error.errno === 1062
              ? res
                  .status(400)
                  .json("Lo sentimos, correo electrónico ya registrado")
              : res.status(400).json({ error })
            : res.status(201).json(result);
        });
      });
    });
  };

  // 2.- Get course units
  // http://localhost:4000/students/units/course_id
  getCourseUnits = (req, res) => {
    const { course_id } = req.params;

    let sql = `SELECT unit_id, unit_tittle FROM unit WHERE course_id = ${course_id} ORDER BY unit_id ASC`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 3.- Get course units
  // http://localhost:4000/students/lessons/:course_id
  getUnitLessons = (req, res) => {
    const { course_id } = req.params;

    let sql = `SELECT lesson_id, lesson_title, lesson_content FROM lesson WHERE course_id = ${course_id} ORDER BY lesson_id ASC`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 4.- Get course material
  // http://localhost:4000/students/courseMaterial/:course:id
  getCourseMaterial = (req, res) => {
    const { course_id } = req.params;

    let sql = `SELECT course.course_id, unit.unit_id, lesson.lesson_id, resource.resource_id, course.course_name, unit.unit_tittle, lesson.lesson_title from (course) JOIN unit ON unit.course_id = course.course_id JOIN lesson ON lesson.unit_id = unit.unit_id JOIN resource ON resource.resource_id = lesson.resource_id WHERE course.course_id = ${course_id} ORDER BY unit.unit_id, lesson_id`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 5.- register all lessons viewed by student
  // http://localhost:4000/students/registerLessonViewed/:user_id/:lesson_id/:course_id
  registerLessonViewedByStudent = (req, res) => {
    const { user_id, lesson_id, course_id } = req.params;

    let sql1 = `SELECT lesson_id FROM lesson_viewed WHERE user_id = ${user_id} AND lesson_id = ${lesson_id} AND course_id = ${course_id}`;

    connection.query(sql1, (error, result) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        if (result.length === 0) {
          let sql2 = `INSERT INTO lesson_Viewed (user_id, lesson_id, course_id) VALUES (${user_id}, ${lesson_id}, ${course_id})`;

          connection.query(sql2, (error, result2) => {
            error
              ? res.status(400).json({ error })
              : res.status(201).json(result2);
          });
        } else {
          res.status(200).json({ error });
        }
      }
    });
  };

  // 6.- Get all lessons viewed by student
  // http://localhost:4000/students/lessonViewed/:user_id/:course_id
  selectLessonViewedByStudent = (req, res) => {
    const { user_id, course_id } = req.params;

    let sql = `SELECT lesson_id FROM lesson_viewed WHERE user_id = ${user_id} AND course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 7.- Get count all lessons viewed by student per course
  // http://localhost:4000/students/lessonViewed/:user_id/:course_id
  selectCountLessonViewedByCourse = (req, res) => {
    const { user_id, course_id } = req.params;

    let sql = `SELECT COUNT(lesson_id) AS count_lessons_viewed FROM lesson_viewed WHERE user_id = ${user_id} AND course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 8.- Get count all lessons course
  // http://localhost:4000/students/countLessonscourse/:user_id/:course_id
  selectCountLessonCourse = (req, res) => {
    const { course_id } = req.params;

    let sql = `SELECT COUNT(lesson.lesson_id) AS count_lessons_Course FROM lesson JOIN resource ON lesson.resource_id = resource.resource_id WHERE lesson.course_id = ${course_id} AND lesson.lesson_is_hidden = 0 AND resource.resource_is_hidden = 0;`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 9.- Upload student exam and change the student status
  // http://localhost:4000/students/uploadExam/:user_id/:course_id
  uploadStudentExam = (req, res) => {
    const { user_id, course_id } = req.params;
    let pdf = req.file.filename;

    let sql1 = `SELECT user_id, course_id FROM student_exam WHERE user_id = ${user_id} AND course_id = ${course_id}`;

    connection.query(sql1, (error, result1) => {
      if (result1.length === 0) {
        if (req.file !== undefined) {
          let sql2 = `INSERT INTO student_exam (user_id, course_id, student_exam_file) VALUES (${user_id}, ${course_id}, "${pdf}")`;

          connection.query(sql2, (error, result2) => {
            if (error) {
              res.status(400).json({ error });
            } else {
              let sql3 = `UPDATE user_course SET status = 2 WHERE user_id = ${user_id} AND course_id = ${course_id}`;

              connection.query(sql3, (error, result3) => {
                error
                  ? res.status(400).json({ error })
                  : res.status(201).json(result3);
              });
            }
          });
        }
      }
    });
  };

  // 10.- Get student status
  // http://localhost:4000/students/studentStatus/:user_id/:course_id
  getStudentStatus = (req, res) => {
    const { user_id, course_id } = req.params;

    let sql = `SELECT status FROM user_course WHERE user_id = ${user_id} AND course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 11.- get course score and counter rating
  // http://localhost:4000/students/scoreCounterRating/:course_id
  getScoreAndCounterRating = (req, res) => {
    const { course_id } = req.params;

    let sql = `SELECT score, counter_rating FROM course WHERE course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 12.- Update score and counter rating
  // http://localhost:4000/students/updateScoreRating/:course_id/:score/:counter_rating
  updateScoreAndCounterRating = (req, res) => {
    const { course_id } = req.params;
    const { score, counter_rating } = req.body;

    let sql = `UPDATE course SET score = ${score}, counter_rating = ${counter_rating} WHERE course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };
}

module.exports = new studentControllers();
