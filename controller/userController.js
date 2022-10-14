const { response } = require("../app");
const productHelper = require("../helpers/productHelper");
const userHelpers = require("../helpers/userHelpers");

module.exports = {
    
    showHome: (req, res) => {

        productHelper.allProducts().then((products)=>{
            let user = req.session.user
            console.log(user);
            
            res.render('user/home',{userlog:true,products,user})
    
        })
      

    },
    showLogin: (req, res) => {
        res.render('user/loginpage',{userlog:true})
    },
    doSignup: (req, res) => {

        // console.log(req.body);
        userHelpers.addSignup(req.body).then((response) => {
            console.log(response);
            req.session.user = response.user
            req.session.loggedIn = true
            res.render('user/otppage')

        })


    },
    doLogin: (req, res) => {
        console.log(req.body)
        userHelpers.addLogin(req.body).then((response) => {
            console.log('hoiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'+response);
            if (response.status) {
                req.session.loggedIn = true
                req.session.user =response.user
              
                res.redirect('/')
            }  else {
                req.session.loginErr = true
                res.redirect('/login')
             }})

        //   }).catch((reject)=>{
        //     if(reject.emailErr){
        //         console.log("bad email");
        //     }if(reject.passwordErr){
        //         console.log("bad pass");
        //     }
        //     res.redirect('/login')
        },
    
    getHome : (req,res) => {
        res.redirect('/')
    }

}