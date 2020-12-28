module.exports = (sequelize, Sequelize) => {
    return sequelize.define('comment', {
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
        isPublic: {
            type: Sequelize.BOOLEAN,
        },
        cityId: {
            type: Sequelize.INTEGER,
        }
    });
}