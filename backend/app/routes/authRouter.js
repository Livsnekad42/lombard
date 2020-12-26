const express = require("express");
const router = express.Router();
const authService = require("../services/authService");
const { signInAdminPanel } = require("../controllers/user.controller");
const settings = require("../config/_setings");
const jwt = require('jsonwebtoken');

// router.get("/start-incoming", (req, res) => {
//   authService
//     .getAuthorization()
//     .then((auth) => res.status(200).json(auth))
//     .catch((err) => res.status(400).json(err));
// });

router.post("/sign-in-admin", (req, res) => {
  signInAdminPanel(req.body)
    .then((status) => {
        if ( status.err ) {
            res.status(200).json(status);
            return;
        }
        const user = status.user;
        const data = {
            login: user.name,
            token: jwt.sign({ id: user.id }, settings.secret, {expiresIn: settings.expiresIn}),
        }
        res.status(200).json(data);
    })
    .catch((error) => {
      res.status(200).json(error);
    });
});

module.exports = router;
