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
        .then(setting => {
            res.status(200).json({ setting });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
});

router.post("/edit-content", (req, res) => {
    const data = req.body;

    updateContentValue(data)
        .then(setting => {
            res.status(200).json({ setting: setting[1][0] });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
});

router.post("/destroy-setting", (req, res) => {
    const data = req.body;
    destroyContent(data.id)
        .then(() => {
            res.status(200).json({ test: "Настройка успешно удалена." });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
});

module.exports = router;