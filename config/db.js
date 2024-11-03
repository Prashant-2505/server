// db.js
const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize
const sequelize = new Sequelize('jobportal', 'root', 'prashant@8447', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
