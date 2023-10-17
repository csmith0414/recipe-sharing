const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const userRecipesRoutes = require('./userRecipesRoutes');
const emailRoute = require('./emailRoute');

router.use('/users', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/userRecipes', userRecipesRoutes);
router.use('/email', emailRoute);



module.exports = router;
