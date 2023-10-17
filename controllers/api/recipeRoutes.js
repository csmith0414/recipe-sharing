const router = require('express').Router();
const { Recipe, User } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
      // Get to display information on selected recipe
      const recipeData = await Recipe.findOne({
        where: { id: req.params.id },
        attributes: ['title', 'created_user_id', 'ingredients', 'instructions'],
        include: [{model: User}],
      });
      // Pass data into Handlebars.js template
      res.render('recipe', {recipe: recipeData, logged_in: req.session.logged_in, email: req.session.email});
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;