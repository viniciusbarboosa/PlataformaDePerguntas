const Sequelize = require('sequelize');
const connection = new Sequelize('sistema_perguntas','root','',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;