// Npm Library Imports
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const flash = require("connect-flash");

//Local Imports
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const aboutController = require("./controllers/about");
const getPostController = require("./controllers/getPost");
const contactController = require("./controllers/contact");
const validationMiddleware = require("./middlewares/validationMiddleware");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const logoutController = require("./controllers/logout");
const loginUserController = require("./controllers/loginUser");
const authMiddleware = require("./middlewares/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middlewares/redirectIfAuthenticatedMiddleware");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/my_database");

const app = express();

global.loggedIn = null;

// Middlewares Registration

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.set("view engine", "ejs");
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());

app.use("/posts/store", validationMiddleware);
app.use("*", (req, res, next) => {
  // Add a property to the request object to store loggedIn information
  loggedIn = req.session.userId ? true : null;
  next();
});

// Request Handlers
app.get("/", homeController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddleware, newPostController);
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.get("/auth/logout", logoutController);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
app.post("/posts/store", authMiddleware, storePostController);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

app.use((req, res) => {
  res.render("notFound");
});

// Port Declaration
const port = 4000;
app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
