const env = require('./env');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//Models/tables
db.affiliateLoc = require('../models/affiliate_location.model.js')(sequelize, Sequelize);
db.cityLoc = require('../models/city_location.model.js')(sequelize, Sequelize);
db.users = require('../models/user.model.js')(sequelize, Sequelize);
db.documents = require('../models/document.model.js')(sequelize, Sequelize);
db.comments = require('../models/comment.model.js')(sequelize, Sequelize);
db.settingsApp = require('../models/settingsApp.model.js')(sequelize, Sequelize);
db.contents = require('../models/content.model.js')(sequelize, Sequelize);

db.cityLoc.hasMany(db.affiliateLoc, {
    foreignKey: 'cityId'
});
db.affiliateLoc.belongsTo(db.cityLoc,{
    foreignKey: 'cityId'
});

module.exports = db;