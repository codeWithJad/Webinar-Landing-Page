const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

app.set("view engine", "ejs");

// body parser setup to handle post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const newData = req.body;

  fs.readFile("users.json", (err, data) => {
    if (err && err.code === "ENOENT") {
      return fs.writeFile(
        "users.json",
        JSON.stringify([newData], null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else {
            res.render("success");
          }
        }
      );
    } else if (err) {
      console.log(err);
    } else {
      const oldData = JSON.parse(data);
      const userExists = oldData.some(
        (user) => user.username === newData.username
      );

      const emailExists = oldData.some((user) => user.email === newData.email);

      if (userExists || emailExists) {
        res.render("index", {
          error: {
            username: userExists ? "Username already exists" : null,
            email: emailExists ? "Email already exists" : null,
          },
        });
      } else {
        oldData.push(newData);
        fs.writeFile("users.json", JSON.stringify(oldData, null, 2), (err) => {
          if (err) throw err;
          res.render("success");
        });
      }
    }
  });
});

app.listen(3001, () => {
  console.log("Server started at port 3001");
});
