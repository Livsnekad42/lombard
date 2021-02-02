const { settingsApp } = require("../config/db_config");
const db = require("../config/db_config");
const Content = db.contents;

/**
 * Метод добавления контента
 *
 * @param data
 */
exports.addContent = async (data) => {
    try {
        return await Content.create(data);
    } catch (e) {
        return e;
    }
};

exports.updateContentValue = async (data) => {
    const content = data.content;
    const header = data.header;
    const enable = data.enable || false;
    try {
        return await Content.update({content, header, enable}, {
            where: { componentName: data.componentName },
            returning: true,
        });
    } catch (e) {
        return e;
    }
}

exports.getContentsAll = async () => {
    try {
        return await Content.findAll({});
    } catch (e) {
        return e;
    }
}

exports.getContentItem = async (componentName) => {
    try {
        return await Content.findOne({
            where: {
                componentName,
            },
        });
    } catch (e) {
        return e;
    }
}


/**
 * Метод удаления контента
 *
 * @param id
 */
exports.destroyContent = async (id) => {
    try {
        return await Content.destroy({
            where: {
                id,
            },
        });
    } catch (e) {
        return e;
    }
};
