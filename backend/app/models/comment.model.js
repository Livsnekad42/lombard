module.exports = (sequelize, Sequelize) => {
    return sequelize.define('comment', {
        cityId: {
            type: Sequelize.INTEGER,
        },
        project: {
            type: Sequelize.STRING
        },
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
            defaultValue: false
        },
        isRead: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    });
}