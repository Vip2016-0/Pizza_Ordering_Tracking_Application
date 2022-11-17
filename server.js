require('dotenv').config()
const expr = require('express')
const app = expr()

const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')

const PORT = process.env.PORT || 3300;

const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')

const MongoDbStore = require('connect-mongo')

//Database connection

const url = 'mongodb://localhost:27017/pizza';

const connection = mongoose.connection;

mongoose.connect(url,
  err => {
      if(err) throw err;
      console.log('Connected to Database')
  }).catch(
    err=>{
      console.log(err);
      console.log("Failed");
    }
  )


app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60*60*24 },
    store: MongoDbStore.create({
        mongoUrl: url
    }),
}));
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(expr.json())
app.use(expr.static('public'))
app.use(expr.urlencoded({extended:false}));
///Global middleware


app.use((req, res, next)=>{
  res.locals.session = req.session;
  res.locals.user = req.user;
  next()
})

app.use(expressLayout)
app.set('views', path.join(__dirname,  '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
});
