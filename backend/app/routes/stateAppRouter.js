const express = require("express");
const router = express.Router();

const {
    addSettingApp,
    updateSettingValue,
    destroySetting
} = require("../controllers/settingApp.controller");
const errorsCode = require("../../app/config/_error_type");
const Validator = require("../validators/validators");


router.post("/create-setting", (req, res) => {
    const validFields = [
        {
            field: "fieldName", 
            required: true, 
            type: "string", 
        },
        {
            field: "value", 
            required: true, 
            type: "string", 
        }
    ];

    const validator = new Validator(validFields);

    const data = req.body;
    if ( !validator.call(res, data) ) {
        return;
    }
    // все добавляемые данные не являются системными
    // любое системное поле добавляется разработчиками запросом к БД
    data.system = false;
    addSettingApp(data)
        .then(setting => {
            res.status(200).json({ setting });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
});

router.post("/edit-setting", (req, res) => {
    const data = req.body;
    
    updateSettingValue(data)
        .then(setting => {
            res.status(200).json({ setting: setting[1][0] });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
});

router.post("/destroy-setting", (req, res) => {
    const data = req.body;
    destroySetting(data.id)
        .then(() => {
            res.status(200).json({ test: "Настройка успешно удалена." });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
});

module.exports = router;