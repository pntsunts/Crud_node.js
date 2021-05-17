const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'user', 'password', {
    dialect: 'sqlite',
    host: './dev.sqlite'
})

module.exports = sequelize;

