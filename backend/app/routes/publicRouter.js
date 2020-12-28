const express = require("express");
const router = express.Router();
const settings = require("../config/_setings");

const { getCityAllLocations } = require("../controllers/map.controller");
const {
    addComment,
    getPublicCommentList,
} = require("../controllers/comment.controller");
const { loanCalculate } = require("../../app/requests/loan");
const errorsCode = require("../../app/config/_error_type");

const validators = (data, requiredFieldList) => {
    /**
     *
     * @param data: Object
     * @returns {[boolean, string]}
     */

    for ( const field of requiredFieldList ) {
        if ( !data[field] ) {
            return [false, field];
        }

    }
    return [true, null];
}

// Comments
router.get("/comments", (req, res) => {
    getPublicCommentList()
        .then((documents) => {
            res.status(200).json(documents);
        })
        .catch((err) => res.status(400).json(err));
});

router.post("/createComment", (req, res) => {
    const requiredFields = [
        "username",
        "content",
        "project",
        "cityId",
    ];
    /*
    * @param data: {
    *       username: string;
    *       content: string;
    *       project: string;
    *       avatar: string;
    *       isPublic: boolean;
    *       cityId: number
    *   }
    * @returns {undefined}
    * */
    const data = req.body;
    const [isValid, field] = validators(data, requiredFields);
    if ( !isValid ) {
        res.status(400).json({
            err: true,
            text: "Не заполнены обязательные поля.",
            code: errorsCode.no_valid,
            fields: [field],
        });
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

// Calculator
router.post("/calculate", (req, res) => {
    /**
     *
     * @param {
     *     creditSum: number,
     *     creditPeriod: number
     * }
     * @returns {undefined}
     */
    const requiredFields = [
        "creditSum",
        "creditPeriod",
    ];

    const data = req.body;
    const [isValid, field] = validators(data, requiredFields);
    if ( !isValid ) {
        res.status(400).json({
            err: true,
            text: "Не заполнены обязательные поля.",
            code: errorsCode.no_valid,
            fields: [field],
        });
        return;
    }

    data.orgBIN = settings.bin;
    data.token = req.tokenElombard;

    loanCalculate(data)
        .then((resp) => {
            res.status(200).json(resp.data);
        })
        .catch((err) => res.status(400).json(err));
});

module.exports = router;