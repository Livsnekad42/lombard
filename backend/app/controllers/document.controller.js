const fs = require("fs");
const path = require('path');
const db = require("../config/db_config");
const settings = require("./../config/_setings");
const Documents = db.documents;

const alphabet = {'@': '_', '!': "_", ' ': '-', 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya'}

function slug (str) {
    try {
        return str.toLowerCase().split("").map(ch => {return !!alphabet[ch] ? alphabet[ch] : ch }).join("");
    } catch (e) {
        return srt;
    }
}

async function getDocumentFromID(id) {
    try {
        return await Documents.findAll({
            where: id
        });
    } catch (e) {
        return e;
    }
}
/**
 * Метод добавления документа
 *
 * @param data
 */
exports.addDocument = async (data) => {
    if ( !data.alias ) {
        data.alias = slug(data.title);
    }
    try {
        return await Documents.create(data);
    } catch (e) {
        return e;
    }
};

exports.getDocument = async (id) => {
    await getDocumentFromID(id);
}

exports.getDocumentsFromProjectName = async (project) => {
    try {
        return await Documents.findAll({
            where: { project }
        });
    } catch (e) {
        return e;
    }
}

exports.getDocumentList = async () => {
    try {
        return await Documents.findAll();
    } catch (e) {
        return e;
    }
}

/**
 * Метод изминения документа
 *
 * @param data
 */
exports.editDocument = async (data) => {
    const document = await getDocumentFromID(id);
    if ( !!document[0].url ) {
        data.url = document[0].url;
    }
    try {
        return await Documents.update(data, {
            where: { id: data.id },
            returning: true,
        });
    } catch (e) {
        return e;
    }
};

/**
 * Метод удаления документа
 *
 * @param id
 */
exports.destroyDocument = async (id) => {
    const document = await getDocumentFromID(id);
    if ( !!document[0].url ) {
        fs.unlink(path.join(settings.basePath, document[0].url), (err) => {
        });
    }
    try {
        return await Documents.destroy({
            where: {
                id,
            },
        });
    } catch (e) {
        return e;
    }
};