const connection = require("../config/db");

const insertTags = (data) => {
  let sql = `INSERT INTO tag (tag_name) VALUES ("${data}")`;

  connection.query(sql, (error, result2) => {
    if (error) res.status(400).json("Mu mal");
  });
};

const insertRelationshipTag = (tagId, courseID) => {
  let sql = `INSERT INTO tag_course (tag_id, course_id) VALUES (${tagId} , ${courseID})`;
  connection.query(sql, (error, result2) => {
    if (error) throw error;
  });
};

module.exports = { insertTags, insertRelationshipTag };
