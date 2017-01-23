module.exports = {
    'website': {
        title: 'Simple Authentication - passport.js + bookshelf.js',
        domain: 'localhost',
        port: 3000
    },
    'security': {
        salt: 'yoursalt'
    },
    'database': {
        mongodb: {
            url: ''
        },
        mysql: {
            client: 'mysql',
            connection: {
                host: 'yourhost.com',
                user: 'user',
                password: 'secret',
                database: 'database',
                charset: 'utf8'
            }
        }
    }
};
