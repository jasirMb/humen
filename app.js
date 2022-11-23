const express = require('express');
// const client = require('twilio')('ACf82f15197ceeb3f9531d32e4d9a66978', 'b213b246e6760dd76dc10e8d3393ca52', {
//     lazyLoading: true
// });

require('dotenv').config()
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin')
const db = require('./config/connection')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const Handlebars = require("handlebars")
const Swal = require('sweetalert2')
const noCache = require('nocache');
const createError = require('http-errors');
// const multer = require('multer')









// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layout/', partialsDir: __dirname + '/views/partials' }))

// // multer.............................
// const storage = multer.diskStorage({
//     destination: function (req, file, callback) { 
//         callback(null, './public/productImages')
//     },
//     // name........................
//     filename: function (req, file, cb) {
//         const unique = Date.now() + '.jpg'
//         cb(null, unique)
//     }
// });
// const upload = multer({ storage: storage })
// app.use(upload.array('productImage', 3), function (req, res, next) {
// next()
// })




// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "Key", cookie: { maxAge: 60000 * 60 } }))
app.use(express.static(path.join(__dirname, 'public',)));

app.use('/fonts', express.static(__dirname + 'public/fonts'))
app.use(noCache())



app.listen(process.env.PORT, () => {
    console.log("server created");
})


app.use('/', userRouter)
app.use('/admin', adminRouter)


Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});
// 404 rendering
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    // console.log(err);
    res.render('user/404');
});

module.exports = app