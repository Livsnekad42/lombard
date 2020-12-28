const express = require("express");
const router = express.Router();

const { getCityAllLocations } = require("../controllers/map.controller");
const {
    addComment,
    getPublicCommentList,
} = require("../controllers/comment.controller");
const errorsCode = require("../../app/config/_error_type");

// Comments
router.get("/comments", (req, res) => {
    getPublicCommentList()
        .then((documents) => {
            res.status(200).json(documents);
        })
        .catch((err) => res.status(400).json(err));
});

router.post("/createComment", (req, res) => {
    /*
    * data: {
    *   username: string;
    *   content: string;
    *   project: string;
    *   avatar: string;
    *   isPublic: boolean;
    *   cityId: number
    * }
    * */
    const data = req.body;
    if ( !data.username || !data.content || !data.project || !data.cityId ) {
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

// City
router.get("/all-city-location", (req, res) => {
    getCityAllLocations()
        .then((cityLocations) => {
            res.status(200).json(cityLocations);
        })
        .catch((err) => res.status(400).json(err));
});

module.exports = router;