const fs = require("fs");
const db = require("../config/db_config");
const Documents = db.documents;

const alphabet = {'@': '_', '!': "_", ' ': '-', 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya'}

exports.slug = (str) => {
    try {
        return str.split("").map(ch => {return !!alphabet[ch] ? alphabet[ch] : ch }).join("");
    } catch (e) {
        return srt;
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
    try {
        return await Documents.findAll({
            where: id
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
    const document = await getDocument(id);
    if ( !!document.url ) {
        data.url = document.url;
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
    const document = await getDocument(id);
    if ( !!document.url ) {
        fs.unlink(document.url, (err) => {});
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