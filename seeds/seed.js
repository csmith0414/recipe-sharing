// Imports
const sequelize = require('../config/connection');
const {User, Recipe } = require('../models');

const userData = require('./userData.json');
const recipesList = require('./recipesList.json');

// Seeds database with user data and recipes
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const recipe of recipesList) {
        await Recipe.create({
            ...recipe,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

// Function call to seed database
seedDatabase();