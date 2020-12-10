module.exports = (sequelize, Sequelize) => {
    return sequelize.define('cityLoc', {
        cityName: {
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