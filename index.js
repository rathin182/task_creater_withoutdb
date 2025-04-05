const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", {
      files: files,
    });
  });
});

app.get("/file/:file", (req, res) => {
  fs.readFile(`./files/${req.params.file}`, "utf-8", (err, data) => {
    res.render("show", {
      file: req.params.file,
      data: data,
    });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.description, (err) => {
      res.redirect("/")
  })
  
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
