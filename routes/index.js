const express= require('express');
const router= express.Router();

//welcome page aka home page
router.get('/',(req,res) => {
  res.render('welcome');
});

module.exports=router;