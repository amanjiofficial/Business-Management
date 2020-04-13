const express= require('express');
const router= express.Router();
const Client =  require('../models/Client');
//client add
router.get('/addclient',(req,res) => {
    res.render('addclient');
});


router.post('/addclient',(req,res) => {
  const{name, email, address, phnumber, bal_amount, def_site_address, def_site_bal_amount, reference} = req.body;
  let errors = [];
  if(!name || !address || !phnumber || !bal_amount || !def_site_address || !def_site_bal_amount){
    errors.push({ msg: 'Please fill in required fields' });
  }
  if(errors.length>0)
  {
    console.log("1");
    res.render('addclient',{
      errors, name, email, address, phnumber, bal_amount, def_site_address, def_site_bal_amount, reference
    });
  }
  else
  {
    //Validation passed
    Client.findOne({ phnumber: phnumber }) //check if user exists or not
    .then(client => {
      if(client)
      {
        //Client exists
        errors.push({ msg:'Client is already Registerd'});
        console.log("1");
        res.render('addclient',{
          errors, name, email, address, phnumber, bal_amount, def_site_address, def_site_bal_amount, reference
        });
      }
      else
      {
        var sites = {
          'address': def_site_address,
          'total_balance': def_site_bal_amount
        };
        const newClient = new Client({
          name: name,
          email: email,
          address: address,
          phnumber: phnumber,
          bal_amount: bal_amount,
          sites: sites,
          reference: reference
        });
        newClient.save();
        req.flash('success_msg', "Registration request has been successfully submitted. Support team will contact you shortly.");
        res.redirect('/');
      }
    });
  }
});

router.get('/addsite',(req,res) => {
    res.render('/addsite');
  });

  router.post('/addsite',(req,res) => {
    
  });


 /* router.get('/viewclient',(req,res) => {
    res.render('/viewclient');
  });
  */
module.exports=router;