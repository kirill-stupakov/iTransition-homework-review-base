const express = require("express");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const passport = require("./src/auth/passport");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.enable("trust proxy");
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("dev"));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(require("./src/routes/review"));
app.use(require("./src/routes/category"));
app.use(require("./src/routes/user"));
app.use(require("./src/routes/tag"));

app.use(require("./src/auth/google"));
app.use(require("./src/auth/github"));
app.use(require("./src/auth/vkontakte"));

app.get("/getUser", (req, res) => {
  res.json(req.user);
});

app.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.json({ message: "done" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
