// import models
const User = require('./User');
const Recipe = require('./Recipe');


// Recipe belongs To User as it was created that way
Recipe.belongsTo(User, {
  foreignKey: 'created_user_id',
})

// User have many Recipes
User.hasMany(Recipe, {
  foreignKey: 'created_user_id',
  onDelete: 'CASCADE',
})


module.exports = {
  User,
  Recipe,
};