// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// imports user to be referenced for the primary key
const User = require("./User") 

// Initialize Recipe model (table) by extending off Sequelize's Model class
class Recipe extends Model {
}

// set up fields and rules for Recipe model
Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    //References the user_id from the User model as the user who created it
    created_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
      },
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
  }
);

module.exports = Recipe;
