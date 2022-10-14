const express = require('express');
const bodyParser = require('body-parser')
const app  = express();
const path = require('path');
const hbs = require('express-handlebars');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin')
const db = require('./config/connection')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const fileUpload = require('express-fileupload');








// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials'}))





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret:"Key",cookie:{maxAge:60000}}))
app.use(express.static(path.join(__dirname, 'public',)));
app.use(fileUpload());
app.use('/fonts',express.static(__dirname + 'public/fonts'))



app.listen(3500,() =>{
    console.log("server created");
})


app.use('/',userRouter)
app.use('/admin' , adminRouter)

module.exports = app