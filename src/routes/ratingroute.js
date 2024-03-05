const express = require('express');
const router = express.Router();
const ratingc=require('../controllers/ratingControllers');


router.post('/assignrating',ratingc.assignRating)

module.exports=router



