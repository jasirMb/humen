const { Router } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')




//home page
router.get('/',controller.showHome) 
//login  page
router.get('/login',controller.showLogin)
// signup
router.post('/signup',controller.doSignup)
//login post
router.post('/login',controller.doLogin)
//to otp page
router.post("/home",controller.otpCompare)
//to home
// router.get('/otppage',controller.otpCompare)

//logout
router.get('/logout',controller.getLogout)
// show profile
router.get('/profile',controller.showProfile)



//route exporting
module.exports = router