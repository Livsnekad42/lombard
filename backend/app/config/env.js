const settings = require("./_setings");

const env = {
    database: 'tezdb',
    username: 'postgres',
    password: '5581488',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

if ( settings.DEBUG ) {
    env.username = 'localtez';
    env.password = "localtez";
} else {

}

module.exports = env;