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

  router.post('/', withAuth, async (req, res) => {
    try {
      const newRecipe = await Recipe.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newRecipe);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const recipeData = await Recipe.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!recipeData) {
        res.status(404).json({ message: 'No recipes found with this id!' });
        return;
      }
  
      res.status(200).json(recipeData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;