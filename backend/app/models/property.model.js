module.exports = (sequelize, Sequelize) => {
    return sequelize.define('property', {
        name: {
            type: Sequelize.STRING
        },
        settingappId: {
            type: Sequelize.INTEGER,
        },
        content: {
            type: Sequelize.TEXT
        },
        header: {
            type: Sequelize.TEXT
        }
    });
}