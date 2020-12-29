module.exports = (sequelize, Sequelize) => {
    return sequelize.define('comment', {
        username: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING,
        },
        cityId: {
            type: Sequelize.INTEGER
        },
        project: {
            type: Sequelize.STRING
        },
        isPublic: {
            type: Sequelize.BOOLEAN,
        },
    });
}