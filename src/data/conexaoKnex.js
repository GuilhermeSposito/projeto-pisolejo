const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: '69063360',
        database: 'pisolejo'
    }
});

module.exports = knex