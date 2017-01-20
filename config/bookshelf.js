var config = require('./app.js');
var knex = require('knex')(config.database.mysql);

module.exports = require('bookshelf')(knex);
