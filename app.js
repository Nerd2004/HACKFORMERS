const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const posta = require('./models/posts');

//Passport Config
require('./config/passport')(passport);

//Connect to Mongo
require('dotenv').config();
mongoose.connect("mongodb+srv://galaxy:galaxy@hackaclust.bkpqb6i.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser:true,useUnifiedTopology:true})
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => console.log(`MongoDB Not Connected ${err}`));


const app = express();
app.use(express.static('public'));

//EJS
// app.use(expressLayouts);
app.set('view engine','ejs');

//Bodyparser
app.use(express.urlencoded({extended:false}));

//Express Session
app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use(fileUpload());
//Routes
app.use('/',require('./routes/route'));
app.use('/users',require('./routes/users'));
app.get('/post', (req, res)=>{
  res.render("post")
})
 app.post('/', (req,res) =>{
   try{
       const text = req.body.posttext;
        const img = req.body.postimg;
       const likes = 0;
  
          const newpost = new posta({
           P_text: text,
          P_url: img,
          p_id: Math.floor(                     
              Math.random() * (99999 - 11111 + 1) + 11111
           ),
           p_likes: likes,
           P_uploadedby:"sumeet"
       })
       newpost.save().catch(err => console.log(err));
       res.redirect("/dashboard");
   }
   catch(error){
       res.status(500).send({message:error.message} ||"Error Occured while Submitting post image");
   }
 })

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server Started on port ${PORT}`));