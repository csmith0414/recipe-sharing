const router = require('express').Router();
const { Recipe } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
      // Get to display information on selected recipe
      const recipeData = await Recipe.findOne({
        where: { id: req.params.id },
        attributes: ['title', 'ingredients', 'instructions'],
      });
        console.log(recipeData);
      // Pass serialized data into Handlebars.js template
      res.render('recipe', {recipe: recipeData});
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;