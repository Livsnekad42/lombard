module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING, defaultValue: false
        },
    });
}