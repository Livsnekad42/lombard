const express = require("express");
const router = express.Router();

const {
    addContent,
    updateContentValue,
    getContentsAll,
    getContentItem,
    destroyContent
} = require("../controllers/content.controller");
const errorsCode = require("../../app/config/_error_type");
const Validator = require("../validators/validators");


router.post("/create-content", (req, res) => {
    const validFields = [
        {
            field: "componentName",
            required: true,
            type: "string",
        },
        {
            field: "content",
            required: true,
            type: "string",
        }
    ];

    const validator = new Validator(validFields);

    const data = req.body;
    if ( !validator.call(res, data) ) {
        return;
    }
    addContent(data)
        .then(content => {
            res.status(200).json({ content });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
});

router.post("/edit-content", (req, res) => {
    const data = req.body;

    updateContentValue(data)
        .then(content => {
            res.status(200).json({ content: content[1][0] });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
});

router.post("/destroy-content", (req, res) => {
    const data = req.body;
    destroyContent(data.id)
        .then(() => {
            res.status(200).json({ response: true, test: "Контент успешно удален." });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
});

module.exports = router;