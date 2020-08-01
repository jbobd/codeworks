const Sequelize = require("sequelize");

//sequelize db connection

const db = new Sequelize("postgres://codeworks:codeworks@localhost/codeworks");

module.exports = db;
