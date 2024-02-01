const connection = require("../config/db");
const bcrypt = require("bcrypt");

class adminControllers {
  // 1.- Create newUser
  // http://localhost:4000/admin/createUser
  createUser = (req, res) => {
    const { user_name, user_lastname, email, password, type } = req.body;

    let saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        err && res.status(401).json({ err });

        let sql = `INSERT INTO user (user_name, user_lastname, email, password, type) VALUES ("${user_name}", "${user_lastname}", "${email}", "${hash}", ${type})`;

        connection.query(sql, (error, result) => {
          error
            ? res.status(400).json({ error })
            : res.status(201).json(result);
        });
      });
    });
  };

  // 2.- View all teachers
  // http://localhost:4000/admin/allTeachers
  selectAllTeachers = (req, res) => {
    let sql = `SELECT * FROM user WHERE type = 1`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 3.- View all students
  // http://localhost:4000/admin/allStudents
  selectAllStudents = (req, res) => {
    let sql = `SELECT * FROM user WHERE type = 0`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 4.- Enable comment
  // http://localhost:4000/admin/enableComment/:comment_id
  enableComment = (req, res) => {
    const { comment_id } = req.params;

    let updateSql = `UPDATE comment SET comment_is_hidden = 0 WHERE comment_id = ${comment_id}`;

    connection.query(updateSql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 5.- Disable comment
  // http://localhost:4000/admin/disableComment/:coment_id
  disableComment = (req, res) => {
    const { comment_id } = req.params;

    let sql = `UPDATE comment SET comment_is_hidden = 1 WHERE comment_id = ${comment_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 6.- Enable User (admin)
  // http://localhost:4000/admin/enableUser/:user_id
  enableUser = (req, res) => {
    const { user_id } = req.params;

    let sql = `UPDATE user SET is_deleted = 0 WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 7.- Disable User (admin)
  // http://localhost:4000/admin/disableUser/:user_id
  disableUser = (req, res) => {
    const { user_id } = req.params;

    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id =${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 8.- Passed course
  // localhost:4000/admin/passedCourse/:user_id
  passedCourse = (req, res) => {
    const { user_id, course_id } = req.params;

    let sql = `UPDATE user_course SET status = 4 WHERE user_id = ${user_id} AND course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 9.- Not passed course
  // localhost:4000/admin/notPassedCourse/:user_id
  notPassedCourse = (req, res) => {
    const { user_id, course_id } = req.params;

    let sql = `UPDATE user_course SET status = 3 WHERE user_id = ${user_id} AND course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 10.- view All Courses (admin)
  // http://localhost:4000/admin/allCourses
  viewAllCourses = (req, res) => {
    let sql = "SELECT * FROM course";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 11.- Create Lesson (admin)
  // http://localhost:4000/admin/createLesson/:course_id/:unit_id
  createLesson = (req, res) => {
    const { course_id, unit_id } = req.params;
    const { lesson_title, lesson_content, lesson_url_video } = req.body;

    let sql = `
    INSERT INTO lesson (course_id, unit_id, lesson_title, lesson_content, lesson_url_video) VALUES (${course_id}, ${unit_id}, '${lesson_title}', '${lesson_content}', '${lesson_url_video}')`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 12.- Create unit (admin)
  // http://localhost:4000/admin/createUnit/:course_id
  createUnit = (req, res) => {
    const { course_id } = req.params;
    const { unit_tittle } = req.body;

    let sql = `INSERT INTO unit (course_id, unit_tittle) VALUES (${course_id}, "${unit_tittle}")`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 13.- Create Resource (admin & teacher)
  // http://localhost:4000/admin/createResource/:user_id/:lesson_id
  createResource = (req, res) => {
    const { user_id, lesson_id } = req.params;

    let file = "";

    if (req.file != undefined) {
      file = req.file.filename;

      let sql = `INSERT INTO resource (user_id, resource_name) VALUES (${user_id}, '${file}')`;

      connection.query(sql, (error, result) => {
        if (error) res.status(400).json({ error });

        let resource_id = result.insertId;

        let sqlLesson = `UPDATE lesson SET resource_id = ${resource_id} WHERE lesson_id = ${lesson_id}`;

        connection.query(sqlLesson, (error, resultLesson) => {
          error
            ? res.status(400).json({ error })
            : res.status(200).json(result);
        });
      });
    } else {
      res
        .status(404)
        .json({ messsage: "Verifique que el archivo se ha adjuntado" });
    }
  };

  // 14.- Select all units, lessons and resource from a course
  // http://localhost:4000/admin/courseInfo
  ViewCourseInfo = (req, res) => {
    let sql = `SELECT course.score AS course_score, course.course_id, unit.unit_id, lesson.lesson_id, resource.resource_id, course.course_name, unit.unit_tittle, lesson.lesson_title FROM course LEFT JOIN unit ON course.course_id = unit.course_id LEFT JOIN lesson ON unit.course_id = lesson.course_id AND unit.unit_id = lesson.unit_id LEFT JOIN resource ON lesson.resource_id = resource.resource_id`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 15.- Delete a Tag from a course
  // http://localhost:4000/admin/deleteCourseTag/:tag_id/:course_id
  deleteTagCourse = (req, res) => {
    const { course_id, tag_id } = req.params;

    let sql = `DELETE FROM tag_course WHERE tag_id = ${tag_id} AND course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 16.- Start dates
  // http://localhost:4000/admin/inscriptionDates
  viewInscriptionDates = (req, res) => {
    let sql = "select * from user_course";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 17.- Delete resource into a lesson
  // http://localhost:4000/admin/deleteResource/:resource_id/:lesson_id
  deleteResource = (req, res) => {
    const { resource_id, lesson_id } = req.params;

    let sql1 = `UPDATE lesson SET resource_id = null WHERE lesson_id = ${lesson_id}`;

    connection.query(sql1, (error, result1) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        let sql2 = `DELETE FROM resource WHERE resource_id = ${resource_id}`;

        connection.query(sql2, (error, result2) => {
          error
            ? res.status(400).json({ error })
            : res.status(200).json(result2);
        });
      }
    });
  };

  // 18.- EditLesson
  // http://localhost:4000/admin/editLesson/:course_id/:unit_id/:lesson_id
  editLesson = (req, res) => {
    const { lesson_title, lesson_content } = req.body;
    const { course_id, unit_id, lesson_id } = req.params;

    let sql = `UPDATE lesson SET lesson_title='${lesson_title}', lesson_content='${lesson_content}' WHERE course_id=${course_id} AND unit_id=${unit_id} AND lesson_id=${lesson_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 19.- EditUnit
  // http://localhost:4000/admin/editUnit/:course_id/:unit_id
  editUnit = (req, res) => {
    const { unit_tittle } = req.body;
    const { course_id, unit_id } = req.params;

    let sql = `UPDATE unit SET unit_tittle='${unit_tittle}' WHERE unit_id = ${unit_id} and course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new adminControllers();
