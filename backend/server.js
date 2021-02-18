const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require("body-parser");
const loger = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');

const RedisApi = require("./app/config/_redis");
const authRouter = require("./app/routes/authRouter");
const loanRouter = require("./app/routes/loanRouter");
const mapRouter = require("./app/routes/mapRouter");
const documentRouter = require("./app/routes/documentRouter");
const commentsRouter = require("./app/routes/commentsRouter");
const settingsRouter = require("./app/routes/stateAppRouter");
const contentRouter = require("./app/routes/contentRouter");
const publicRouter = require("./app/routes/publicRouter");

const settings = require("./app/config/_setings");
const errorsCode = require("./app/config/_error_type");

// node > 11.0
require('tls').DEFAULT_MIN_VERSION = 'TLSv1'

// Устанавливаем копоративный токен при запуске сервера
const redisApi = new RedisApi();
redisApi._init();
redisApi.setAuthToken()
    .then(token => {
      if ( !!token ) {
        console.log("token installed");
        return;
      }
      console.log("token not installed");
    })
    .catch(err => {
      console.log("token not installed: ", err);
    });

settings.basePath = __dirname;

// безопасные общедоступные методы
const safe_methods = [
    "/api/auth.*",
    "/api/loan.*",
    "/api/public.*",
];
// методы, для которых обязателен корпоративный токен
const token_methods = [
    "/api/loan/*",
    "/api/public/calculate"
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
    res.status(401).send();
  }
})

// Пробрасываем копоративный токен в объект запроса, для удобства
app.use((req, res, next) => {
    for (const safe of token_methods) {
        const regPath = new RegExp(safe);
        if ( regPath.test(req.path) ) {
            redisApi.getAuthToken()
                .then(token => {
                    req.tokenElombard = token;
                    next();
                })
                .catch(err => {
                    res.status(401).json({error: "Not Auth Token"});
                });
            return;
        }
    }
    next();
});

global.__baseurl = "http://tezlombard.kz";
app.use(cookieParser());
// const cors = require("cors");
// app.use(cors());

app.use("/media", express.static(__dirname + '/media'));
app.use("/api/auth", authRouter);
app.use("/api/loan", loanRouter);
app.use("/api/map", mapRouter);
app.use("/api/media", documentRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/content", contentRouter);
app.use("/api/public", publicRouter);

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

module.exports.app = app;