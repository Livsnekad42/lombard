const express = require("express");
const router = express.Router();

const {
    addComment,
    getCommentList,
    destroyComment,
    editComment
} = require("../controllers/comment.controller");
const errorsCode = require("../../app/config/_error_type");


router.get("/commentList", (req, res) => {
    getCommentList()
        .then((documents) => {
            res.status(200).json(documents);
        })
        .catch((err) => res.status(400).json(err));
});

router.post("/create-comment", (req, res) => {
    const data = req.body;
    if ( !data.username || !data.content || !data.content || !data.project || !data.cityId ) {
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

router.post("/edit-comment", (req, res) => {
    const data = req.body;
    if ( !data.username || !data.content ) {
        res.status(400).json({err: true, text: "Не заполнены обязательные поля.", code: errorsCode.no_valid});
        return;
    }
    editComment(data)
        .then(comment => {
            res.status(200).json({ comment: comment[1][0] });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
});

router.post("/destroy-comment", (req, res) => {
    const data = req.body;
    destroyComment(data.id)
        .then(() => {
            res.status(200).json({ test: "Комментарий успешно удален" });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
});

module.exports = router;