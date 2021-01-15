module.exports = (sequelize, Sequelize) => {
    return sequelize.define('content', {
        componentName: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.TEXT
        },
        header: {
            type: Sequelize.TEXT,
        },
        enable: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
}