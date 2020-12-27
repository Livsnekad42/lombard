const express = require("express");
const router = express.Router();

const {
    addComment,
    getPublicCommentList,
} = require("../controllers/comment.controller");
const errorsCode = require("../../app/config/_error_type");

router.get("/comments", (req, res) => {
    getPublicCommentList()
        .then((documents) => {
            res.status(200).json(documents);
        })
        .catch((err) => res.status(400).json(err));
});

router.post("/createComment", (req, res) => {
    const data = req.body;
    if ( !data.username || !data.content ) {
        res.status(400).json({err: true, text: "Не заполнены обязательные поля.", code: errorsCode.no_valid});
        return;
    }
    addComment(data)
        .then(comment => {
            res.status(200).json({ comment });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
});

module.exports = router;