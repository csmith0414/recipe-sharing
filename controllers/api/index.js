const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const userRecipesRoutes = require('./recipeRoutes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/userRecipes', userRecipesRoutes);



module.exports = router;
