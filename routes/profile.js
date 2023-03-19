const { name } = require('ejs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Userr = require('../models/User'); 

var db = mongoose.connection;
 db.on('error',(err)=>{
    console.error('Connection Error');
 }) 
db.once('open',function(){
    console.log("Connected");
});

router.get('/:email',ensureAuthenticated,async(req,res) =>{
    const visiter = req.user;
    const user = await Userr.find({});
    const owner = user.find(o => o.email === req.params.email);
    console.log(owner);
    const following = visiter.following;
    var ans = 1;
    if(following.find(element => element == owner.email)){
        ans = 1;
    }
    else ans = 0;
    // console.log(ans);
    res.render('profile',{owner:owner,visiter:visiter,ans:ans});
})
router.get('/:email/follow',ensureAuthenticated,async(req,res) =>{
    const visiter = req.user.email;
    const user = await Userr.find({});
    const owner = user.find(o => o.email === req.params.email);
    try{
        db.collection('test').updateOne(
            {email:visiter},
           {
            $push:{
                following:owner.email
            }
           }
        )
        db.collection('test').updateOne(
            {email:owner.email},
           {
            $push:{
                followers:visiter
            }
           }
        )
        console.log(req.user.following);
        console.log(owner.followers);
    }
    catch(error) {console.log("Error Occured while updating follows" + error);}
    res.send('You clicked on Follow');
})
module.exports = router;