const router = require('express').Router();
const { Recipe } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all users, sorted by name
    const recipeData = await Recipe.findAll({
      order: [['id', 'ASC']],
    });

    // Serialize user data so templates can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render('homepage', { recipes, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', async (req, res) => {
  try {
    // Get all users, sorted by name
    const recipeData = await Recipe.findAll({
      order: [['id', 'ASC']],
      where: { created_user_id: req.session.id },
    });

    // Serialize user data so templates can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render('userRecipes', { recipes, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    // Pass serialized data into Handlebars.js template
    res.render('login', { logged_in: false });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
