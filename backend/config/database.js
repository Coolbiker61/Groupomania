const dotenv = require('dotenv').config();
const Sequelize = require('sequelize');
const models = {};

const db = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// importe le model User
const model = db['import']('../models/User');
models[model.name] = model;
// const Message = db['import']('../models/Message');
// models[model.name] = Message;
// const Comment = db['import']('../models/comment');
// models[model.name] = Comment;
// const Like = db['import']('../models/like');
// models[model.name] = Like;
// ajoute les relations des models
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = db;
models.Sequelize = Sequelize;
module.exports = models;

//global.sequelize = db;