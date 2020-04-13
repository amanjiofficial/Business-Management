const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');


//Test
const app = express();

//Passport Config
//require('./config/passport')(passport);

//DB config
const db = 'mongodb://localhost:27017/rdak';

//Connect to mongodb
mongoose.connect(db,{ useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//ejs
app.use(expressLayouts);
app.set('view engine','ejs');

//Static files
app.use(express.static('public'));

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express session
app.use(session({
  secret: 'secret key',
  resave: true,
  saveUninitialized: true
}));

/*
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
*/
//connect flash
app.use(flash());

//Global Variables
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/clients', require('./routes/clients'));
app.listen(3000);

//The 404 Route
app.get('*', function(req, res){
  res.status(404).send('Page Under Construction');
});