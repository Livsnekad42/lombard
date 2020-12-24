const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require("body-parser");
const loger = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');

const authRouter = require("./app/routes/authRouter");
const loanRouter = require("./app/routes/loanRouter");
const mapRouter = require("./app/routes/mapRouter");
const documentRouter = require("./app/routes/documentRouter");
const settings = require("./app/config/_setings");
const errorsCode = require("./app/config/_error_type");

settings.basePath = __dirname;
const safe_methods = [
    "/api/auth.*",
    "/api/loan.*"
];

app.use(fileUpload({
  createParentPath: true
}));
app.use(loger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("X-Requested-With", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  // console.log(res);
  next();
});

app.use((req, res, next) => {
  if ( req.method === "GET" ) {
    next();
    return;
  }

  for (const safe of safe_methods) {
    const regPath = new RegExp(safe);
    if ( regPath.test(req.path) ) {
      next();
      return;
    }
  }
  if (req.headers.authorization) {
    jwt.verify(
        req.headers.authorization.split(' ')[1],
        settings.secret,
        (err, payload) => {
          if (err) {
            return;
          }
          req.payload = payload;
          next();
        }
    )
  }
  if ( !req.payload || !req.payload.id ) {
    res.status(201).json({err: true, text: "Не авторизованный пользователь", code: errorsCode.no_permission});
  }
})

global.__baseurl = "http://back-tezlombard.kz";
app.use(cookieParser());
// const cors = require("cors");
// app.use(cors());

app.use("/media", express.static(__dirname + '/media'));
app.use("/api/auth", authRouter);
app.use("/api/loan", loanRouter);
app.use("/api/map", mapRouter);
app.use("/api/media", documentRouter);

const db = require("./app/config/db_config.js");
const { createUser } = require("./app/controllers/user.controller");
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// defaultUserCreate()
//});

const defaultUserCreate = () => {
  const email = 'tez_admin@gmail.com'
  const password = 'zxcqwe1234'
  const name = 'Admin'
  createUser({name, email, password})
}

const server = app.listen(4040, function () {
  const host = "localhost";
  const port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
  console.log("Server created", host, port);
});
