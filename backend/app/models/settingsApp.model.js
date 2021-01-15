module.exports = (sequelize, Sequelize) => {
    return sequelize.define('settingapp', {
        fieldName: {
            type: Sequelize.STRING,
            unique: true
        },
        description: {
            type: Sequelize.STRING
        },
        value: {
            type: Sequelize.STRING,
        },
        system: { 
            // системное поле, наличие которого критично для приложения
            // системные строки удалять нельзя
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        enable: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
}