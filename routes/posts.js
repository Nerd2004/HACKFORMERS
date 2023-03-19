const { name } = require('ejs');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const posta = require('../models/posts');
const User = require('../models/User'); 

router.get("/", ensureAuthenticated, async(req, res) => {
    try{
      const post = await posta.find({});
      const user = await User.find({});
      const names = new Map();
      const photos = new Map();
      post.forEach(function(nova, index){
          const person = user.find(o => o.email === nova.P_uploadedby);
          photos.set(nova.P_uploadedby,person.image);
          names.set(nova.P_uploadedby,person.name);
      })
      // res.render('index', post);
      res.render("posts", {
        post: post,
        names: names,
        photos:photos,
        user:user
      });
      const userloggedin = req.user.name;
      console.log(userloggedin);
  }
  catch(error){
      res.status(500).send({message:error.message || "Error Occured"});
  }
});

router.post('/',(req,res) =>{
    try{
        console.log(req.user.email);
        const userloggedin = req.user.email;
        // console.log(userloggedin);
        const text = req.body.posttext;
        // const img = req.body.postimg;
        const likes = 0;
        let imageUploadFile;
        let uploadPath;
        let newImageName;
    
        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No Files were uploaded.');
        }else{
    
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;
    
            uploadPath = require('path').resolve('./')+'/public/uploads/' + newImageName;
    
            imageUploadFile.mv(uploadPath,function(err){
                if(err) return res.status(500).send(err);
            })
        }
        const newpost = new posta({
            P_text: text,
            P_img: newImageName,
            p_id: Math.floor(
              Math.random() * (99999 - 11111 + 1) + 11111
            ),
            p_likes: likes,
            P_uploadedby:userloggedin
        })
        newpost.save().catch(err => console.log(err));
        res.redirect("/dashboard");
    }
    catch(error){
        res.status(500).send({message:error.message} ||"Error Occured while Submitting post image");
    }
    
});

module.exports = router;