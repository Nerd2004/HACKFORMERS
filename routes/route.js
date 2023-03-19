// const { name } = require('ejs');
// const express = require('express');
// const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
// //Welcome Page
// router.get('/',(req,res) => res.render('welcome'));
// //Dashboard 
// router.get('/dashboard',ensureAuthenticated,(req,res) => 
// res.render('dashboard',{name:req.user.name}));

// router.get('/explore', ensureAuthenticated,(req,res) => 
// res.render('explore',{name:req.user.name}));
// module.exports = router;
const { name } = require('ejs');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const posta = require('../models/posts');
const User = require('../models/User'); 

//Welcome Page
router.get('/',(req,res) => res.render('welcome'));
//Dashboard 
router.get('/dashboard',ensureAuthenticated,async(req,res) => {
    try{
        const post = await posta.find({});
      const user = await User.find({});
      post.forEach(function(nova, index){
          const person = user.find(o => o.email === nova.P_uploadedby);
      })
      res.render("dashboard", {
        post: post,
      });
      const userloggedin = req.user.name;
      console.log(userloggedin);
    }catch(error){
         res.status(500).send({message:error.message || "Error Occured"});
    }
    // res.render('dashboard',{name:req.user.name,})
}
);

router.get('/profile',ensureAuthenticated,async(req,res) => {
  try{
      const post = await posta.find({});
    const user = await User.find({});
    post.forEach(function(nova, index){
        const person = user.find(o => o.email === nova.P_uploadedby);
    })
    res.render("explore", {
      post: post,
    });
    const userloggedin = req.user.name;
    console.log(userloggedin);
  }catch(error){
       res.status(500).send({message:error.message || "Error Occured"});
  }
  // res.render('dashboard',{name:req.user.name,})
}
);

module.exports = router;