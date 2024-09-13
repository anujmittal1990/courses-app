const express = require("express");
const app = express();
app.use(express.json());

let admin = [];
let courses = [];
let user = [];
let purchased_courses = [];

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

const userAuthenticate = (req, res, next) => {
  const { username, password } = req.headers;
  const usr = user.find(
    (a) => a.username === username && a.password === password
  );
  if (usr) {
    next();
  } else {
    res.status(403).json({ message: "User authentication failed" });
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

app.delete("/admin/del_course", adminAuthenticate, (req, res) => {
  const del_course = courses.find((c) => c.id == req.headers.id);
  const index = courses.indexOf(del_course);
  if (index > -1) {
    // only splice array when item is found
    courses.splice(index, 1); // 2nd parameter means remove one item only
  }
  res.json(courses);
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

//User Signup
app.post("/user_signup/", (req, res) => {
  user.push(req.body);
  res.json({ message: "User created successfully" });
});

//User Login
app.post("/user/login/", userAuthenticate, (req, res) => {
  res.status(200).json({ message: "User authenticated Successfully" });
});

//Get all user Courses
app.get("/user/all_courses/", userAuthenticate, (req, res) => {
  const pub_true = courses.filter((a) => a.published == "true");
  res.json({ courses: pub_true });
});

//Purchase Courses
app.post("/user/pur_courses/", userAuthenticate, (req, res) => {
  const pur_course = courses.find((c) => c.id == req.headers.course_id);
  pur_course.purchase_id = Date.now();
  res.json(pur_course);
});

app.listen(3000, () => {
  console.log(`Server started at Port: ${3000}`);
});
