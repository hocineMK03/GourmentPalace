const express = require('express');
const router = express.Router();
const ingc=require('../controllers/ingredientController');


router.get('/getingredients',ingc.handleRetreiveIngredients)
router.post('/deleteingredeint',ingc.handleDeleteIngredient)
router.post('/postingredient',ingc.handlePostIngredient)


module.exports=router



