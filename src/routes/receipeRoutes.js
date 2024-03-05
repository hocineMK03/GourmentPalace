const express = require('express');
// const cors = require('cors');
const rc=require('../controllers/receipeControllers')

const router = express.Router();
// const corsOptions = {
//     origin: '*', // Replace with your allowed origin
//     methods: 'GET,POST,DELETE',
//     credentials: true,
//   };
  
//   router.use(cors(corsOptions));

  router.get('/getreceipes',rc.handlereceipes)
  router.get('/getreceipes/:searchquery',rc.handlereceipes)
  router.post('/createrecipe',rc.handleCreateRecipe)
  module.exports=router