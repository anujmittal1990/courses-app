const express = require("express");
const app = express();
app.use(express.json());

let admin = [];
let courses = [];

const adminAuthenticate = (req, res, next) => {
  const { username, password } = req.headers;
  const adm = admin.find(
    (a) => a.username === username && a.password === password
  );
  if (adm) {
    next();
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
};

//Admin Signup
app.post("/admin_signup/", (req, res) => {
  //admin.push({ counter: req.query.counter });
  admin.push(req.body);
  res.json({ message: "Admin created successfully" });
});

//Admin Login
app.post("/admin/login/", adminAuthenticate, (req, res) => {
  res.status(200).json({ message: "Admin authenticated Successfully" });
});

//Update Course
app.put("/admin/courses/:id/", adminAuthenticate, (req, res) => {
  const course = courses.find((c) => c.id == parseInt(req.params.id));
  if (course) {
    Object.assign(course, req.body);
    res.json(courses);
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

//Create Course
app.post("/admin/courses/", adminAuthenticate, (req, res) => {
  req.body.id = Date.now();
  courses.push(req.body);
  res.send(courses);
});

//Get all Courses
app.get("/admin/all_courses/", adminAuthenticate, (req, res) => {
  res.json({ courses: courses });
});

app.listen(3000, () => {
  console.log(`Server started at Port: ${3000}`);
});
