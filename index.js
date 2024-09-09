const express = require("express");
const app = express();
let admin = [];
app.use(express.json());

app.post("/admin_signup/", (req, res) => {
  //admin.push({ counter: req.query.counter });
  admin.push(req.body);
  res.send(`{ message: 'Admin created successfully' }`);
});

app.post("/admin_login/", (req, res) => {
  const { username, password } = req.headers;
  const adm = admin.find(
    (a) => a.username == username && a.password == password
  );
  if (adm) {
    res.status(200).json({ message: "Admin authenticated Successfully" });
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
});

app.post("/admin/courses/", (req, res) => {
  const { username, password } = req.headers;
  const adm = admin.find(
    (a) => a.username == username && a.password == password
  );
  if (adm) {
    res.status(200).json({ message: "Admin authenticated Successfully" });
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
});

app.get("/all_adm_reg", (req, res) => {
  res.send(admin);
});

app.listen(3000, () => {
  console.log(`Server started at Port: ${3000}`);
});
