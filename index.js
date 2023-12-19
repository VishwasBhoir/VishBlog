const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const BlogPost = require("./models/BlogPost");
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const contactController = require("./controllers/contact");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/my_database");

const app = express();

const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null || req.body.title == null) {
    return res.redirect("/posts/new");
  }
  next();
};

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/posts/store", validateMiddleWare);

app.set("view engine", "ejs");

app.get("/", homeController);

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", contactController);
app.get("/post/:id", getPostController);
app.get("/posts/new", newPostController);

app.post("/posts/store", async (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "public/img", image.name));

  const blogPost = {
    title: req.body.title,
    body: req.body.body,
    image: "/img/" + image.name,
  };

  await BlogPost.create(blogPost)
    .then((blogPost) => {
      console.log("Created Post: ", blogPost);
    })
    .catch((err) => {
      console.log("error: ", err);
    });

  res.redirect("/");
});

const port = 4000;
app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
