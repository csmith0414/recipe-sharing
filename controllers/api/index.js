const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const userRecipesRoutes = require('./userRecipesRoutes');

router.use('/users', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/userRecipes', userRecipesRoutes);



module.exports = router;
