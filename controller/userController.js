const { response } = require("../app");

const productHelper = require("../helpers/productHelper");
const userHelpers = require("../helpers/userHelpers");
const userSchema = require("../models/userSchema");
const bcrypt = require('bcrypt')
const otpGenerator = require('otp-generator')
const accountSid = 'ACf82f15197ceeb3f9531d32e4d9a66978';
const authToken = 'b213b246e6760dd76dc10e8d3393ca52';
const client = require('twilio')(accountSid, authToken);


module.exports = {
    showHome: (req, res) => {
        productHelper.allProducts().then((products) => {
            let user = req.session.user
            // console.log(user);
            res.render('user/home', { userlog: true, products, user })
        })
    },
    showLogin: (req, res) => {
        if (req.session.loggedIn) {
            res.redirect('/')
        }
        else {
            res.render('user/loginpage', { "signupErr": req.session.signupErr, "loginErr": req.session.loginErr,
            "confirmPassErr": req.session.confirmpassErr,"blockedErr": req.session.blocked })
            req.session.signupErr = false,req.session.loginErr= false,req.session.confirmpassErr = false,
            req.session.blocked = false
        }
    },
    doSignup: (req, res, next) => {
        if(req.body.Password == req.body.Password2 ){
            userSchema.findOne({ userEmail: req.body.userEmail }, async (err, data) => {
                // console.log(data == null);
                if (data == null) {
                    let response = {}
                    let otpGen = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
                    console.log(otpGen);
                    
                    req.session.userdata = req.body
                    req.session.userdata.otp = otpGen
                    // client.messages
                    //     .create({
                    //         body: otpGen,
                    //         messagingServiceSid: 'MGc561e6dfb83292c170c808f2fb534508',
                    //         to: '+918848607194'
                    //     })
                    //     .then(message => console.log(message.sid))
                    //     .done();
                    res.render('user/otppage')
    
                } else {
                    req.session.signupErr = true
                    res.redirect('/login')
                }
            })
        }else {
            req.session.confirmpassErr = true
            res.redirect('/login')
        }
       
    },
    otpCompare:async (req, res) => {
        user = (req.session.userdata);
        generatedOtp=req.session.userdata.otp
        req.session.user = user;
        // console.log((req.body.otp));
        // console.log();
        // console.log(generatedOtp ==req.body.otp);
        if( generatedOtp ==req.body.otp){
            const newuser = new userSchema
                    ({
                        userName: user.userName,
                        userEmail: user.userEmail,
                        phoneNo: user.phoneNo,
                        Password: await bcrypt.hash(user.Password, 10),
                        Status: true
                    })
                newuser.save()
                .then((data) => {
                    //console.log(data)
                    // response.user = data
                    // response.status = true
                    req.session.loggedIn = true
                    res.redirect('/')
                })
                    .catch(err => {
                        console.log('error is'+err);
                        res.redirect('/login')
                    })

            // res.render('user/home') 
        }else{
            req.session.otpErr = true
            res.render('user/otppage',{"otpErr":req.session.otpErr})
            req.session.otpErr = false
        }
        
        
    },
    doLogin: (req, res) => {
        // console.log(req.body)
        userHelpers.addLogin(req.body).then((response) => {
            // console.log("errrrrrrrrrrr"+response);
            if (response.blocked == false) {
                req.session.blocked = true
                console.log('yoo u r blocked');
                res.redirect('/login')
            } else {
                console.log("elsee");
                if (response.status) {
                    console.log("elseeif");
                    req.session.loggedIn = true
                    req.session.user = response.user
                    res.redirect('/')
                } else {
                    console.log("elseifelse");
                    req.session.loginErr = true
                    res.redirect('/login')
                }
            }
        })
    },
    getHome: (req, res) => {
        res.redirect('/')
    },
    getLogout: (req, res) => {
        req.session.user = null
        req.session.loggedIn = false
        res.redirect('/')
    },
    showProfile: (req, res) => {
        let user = req.session.user
        if (user) {
            // console.log(user.userEmail);
            res.render('user/user-profile', { user })
        } else {
            res.redirect('/login')
        }
    }

}