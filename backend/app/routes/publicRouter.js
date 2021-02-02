const express = require("express");
const router = express.Router();
const settings = require("../config/_setings");

const { getCityAllLocations } = require("../controllers/map.controller");
const {
    addComment,
    getPublicCommentList,
} = require("../controllers/comment.controller");
const { getSettingsApp } = require("../controllers/settingApp.controller");
const { getContentsAll } = require("../controllers/content.controller");
const { loanCalculate } = require("../../app/requests/loan");
const errorsCode = require("../../app/config/_error_type");
const Validator = require("../validators/validators");


// Comments
router.get("/comments", (req, res) => {
    getPublicCommentList()
        .then((documents) => {
            res.status(200).json(documents);
        })
        .catch((err) => res.status(400).json(err));
});

router.post("/createComment", (req, res) => {
    const validFields = [
        {
            field: "username", 
            required: true, 
            type: "string", 
        },
        {
            field: "content", 
            required: true, 
            type: "string", 
        },
        {
            field: "project", 
            required: true, 
            type: "string", 
        },
        {
            field: "cityId", 
            required: true, 
            type: "number", 
        }
    ];

    const validator = new Validator(validFields);
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
    if ( !validator.call(res, data) ) {
        return;
    }
    data.isPublic = false;
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

    const validFields = [
        {
            field: "creditSum", 
            required: true, 
            validFunc: (val) => {return +val >= 10}, 
        },
        {
            field: "creditPeriod", 
            required: true, 
            validFunc: (val) => {return +val > 0}, 
        }
    ];

    const validator = new Validator(validFields);

    const data = req.body;
    if ( !validator.call(res, data) ) {
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

// settings
router.get("/settings", (req, res) => {
    getSettingsApp()
        .then((settingsList) => {
            res.status(200).json(settingsList);
        })
        .catch((err) => res.status(400).json(err));
});

router.get("/contents-app", (req, res) => {
    getContentsAll()
        .then((settingsList) => {
            res.status(200).json(settingsList);
        })
        .catch((err) => res.status(400).json(err));
});

module.exports = router;