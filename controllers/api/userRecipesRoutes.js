const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      // Get all users, sorted by name
      const recipeData = await Recipe.findAll({
        where: { created_user_id: req.session.id },
        order: [['id', 'ASC']],
      });
  
      // Serialize user data so templates can read it
      const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
  
      // Pass serialized data into Handlebars.js template
      res.render('userRecipes', { recipes });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;