const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//home rout
app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", {
      files: files,
    });
  });
});

//read rout
app.get("/file/:file", (req, res) => {
  fs.readFile(`./files/${req.params.file}`, "utf-8", (err, data) => {
    res.render("show", {
      file: req.params.file,
      data: data,
    });
  });
});

//edit rout show
app.get("/edit/:file", (req, res) => {
  res.render("edit", {
    file: req.params.file,
  });
});

//edit rout
app.post("/edit", (req, res) => {
  fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}.txt`, (err) => {
    res.redirect("/");
  });
});

//create rout
app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.description,
    (err) => {
      res.redirect("/");
    }
  );
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
