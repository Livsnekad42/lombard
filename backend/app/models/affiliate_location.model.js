module.exports = (sequelize, Sequelize) => {
    return sequelize.define('affiliateLoc', {
        cityId: {
            type: Sequelize.INTEGER,
        },
        affiliateName: {
            type: Sequelize.STRING
        },
        affiliatePhone: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        schedule: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING,
        },
    });
}