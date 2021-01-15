const { settingsApp } = require("../config/db_config");
const db = require("../config/db_config");
const Settings = db.settingsApp;

/**
 * Метод добавления значения
 *
 * @param data
 */
exports.addSettingApp = async (data) => {
    try {
        return await Settings.create(data);
    } catch (e) {
        return e;
    }
};

exports.updateSettingValue = async (data) => {
    const value = data.value;
    const description = data.description;
    const enable = data.enable || false;
    try {
        return await Comments.update({value, description, enable}, {
            where: { fieldName: data.fieldName },
            returning: true,
        });
    } catch (e) {
        return e;
    }
}

exports.getSettingsApp = async () => {
    try {
        return await Settings.findAll({});
    } catch (e) {
        return e;
    }
}

exports.getSettingsFromFieldName = async (fieldName) => {
    try {
        return await Settings.findOne({ 
            where: { 
                fieldName, 
            } 
        });
    } catch (e) {
        return e;
    }
}


/**
 * Метод удаления поля настройки
 *
 * @param id
 */
exports.destroySetting = async (id) => {
    const settingItem = await Settings.findOne({ where: { id } });
    if ( !settingItem ) throw new Error("not found from Settings");
    if ( !settingItem.system ) {
        try {
            return await Settings.destroy({
                where: {
                    id,
                },
            });
        } catch (e) {
            return e;
        }
    } else {
        throw new Error("cannot be deleted");
    }
};
