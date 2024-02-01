var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const nodemailer = require("nodemailer");

var adminRouter = require("./routes/admin");
var teacherRouter = require("./routes/teacher");
var studentRouter = require("./routes/student");
var courseRouter = require("./routes/course");
var commonRouter = require("./routes/common");

var app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use("/teachers", teacherRouter);
app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/", commonRouter);

// Configuration nodemailer to contact form
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "droneMasterEmail",
    pass: "contraseñaDroneMasterEmail",
  },
});

app.post("/infoEmail", async (req, res) => {
  try {
    const {
      user_name,
      user_lastname,
      phone,
      email,
      course_name,
      course_price,
      start_date,
      status,
      teacher_email,
      course_date,
    } = req.body;
    const currentDate = new Date();

    if (status === 1) {
      await transporter.sendMail({
        from: "droneMasterEmail",
        to: `droneMasterEmail,${teacher_email}`,
        subject: `¡${user_name} ${user_lastname} inscrito en ${course_name}!`,
        text: `Alumno: ${user_name} ${user_lastname}\nTeléfono: ${
          phone !== null ? phone : ""
        }\nEmail: ${email}\n\n${user_name} ${user_lastname} se ha inscrito en el ${course_name}${
          course_date > currentDate
            ? ` con fecha de inicio el ${start_date}.`
            : "."
        }`,
      });
    }

    if (status === 2) {
      await transporter.sendMail({
        from: "droneMasterEmail",
        to: `droneMasterEmail,${teacher_email}`,
        subject: `¡${user_name} ${user_lastname} ha finalizado el ${course_name}!`,
        text: `Alumno: ${user_name} ${user_lastname}\nTeléfono: ${
          phone !== null ? phone : ""
        }\nEmail: ${email}\n\n${user_name} ${user_lastname} ha finalizado el ${course_name}. Su examen está listo para corregir.`,
      });
    }

    res.json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error" });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
