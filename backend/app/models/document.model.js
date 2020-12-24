module.exports = (sequelize, Sequelize) => {
    return sequelize.define('document', {
        title: {
            type: Sequelize.STRING
        },
        alias: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING,
        },
    });
}