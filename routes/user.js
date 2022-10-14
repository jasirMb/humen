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

router.get("/home",controller.getHome)

module.exports = router