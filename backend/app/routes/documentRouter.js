const express = require("express");
const router = express.Router();
const settings = require("./../config/_setings");

const {
    addDocument,
    editDocument,
    destroyDocument,
    getDocument,
    getDocumentList
} = require("../controllers/document.controller");
const errorsCode = require("../../app/config/_error_type");


router.get("/documentList", (req, res) => {
    getDocumentList()
        .then((documents) => {
            res.status(200).json(documents);
        })
        .catch((err) => res.status(400).json(err));
});

router.get("/document/:docId", (req, res) => {
    getDocument(req.params.docId)
        .then((document) => {
            res.status(200).json(document);
        })
        .catch((err) => res.status(400).json(err));
});

router.post("/create-document", (req, res) => {
    const data = req.body;
    if(!req.files) {
        res.status(400).json({err: true, text: 'Не выбран файл', code: errorsCode.no_valid});
        return;
    }
    if ( !data.title ) {
        res.status(400).json({err: true, text: "Заполните обязательные поля", code: errorsCode.no_valid});
    } else {
        let file = req.files.files;
        const path = settings.media + file.name;
        file.mv("." + path);
        data.url = path;
        addDocument(data)
            .then(document => {
                res.status(200).json({ document });
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    }
});

router.post("/edit-document", (req, res) => {
    const data = req.body;
    if ( !data.title || !data.alias ) {
        res.status(400).json({err: true, text: "Заполните обязательные поля", code: errorsCode.no_valid});
    } else {
        editDocument(data)
            .then(document => {
                res.status(200).json({ document: document[1][0] });
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    }
});

router.post("/destroy-document", (req, res) => {
    const data = req.body;
    if ( !data.id ) {
        res.status(400).json({err: true, text: "Не указан идентификатор документа", code: errorsCode.no_valid});
    } else {
        destroyDocument(data.id)
            .then(() => {
                res.status(200).json({ test: "Документ успешно удален" });
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    }
});

module.exports = router;