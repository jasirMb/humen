const { Router } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')




//home page
router.get('/', controller.showHome)
//login  page
router.get('/login', controller.showLogin)
// signup
router.get('/signup', controller.showSignup)
router.post('/signup', controller.doSignup)
//login post
router.post('/login', controller.doLogin)
//to otp page
router.post("/home", controller.otpCompare)
//to home
// router.get('/otppage',controller.otpCompare)

//logout
router.get('/logout', controller.getLogout)
// show profile
router.get('/profile', controller.showProfile)
// edit profile
router.get('/edit-profile', controller.editProfile)
//  show single product
router.get('/single-product/:id', controller.singleProduct)
// add to cart
router.post('/addToCart/:proId/:quantity', controller.addToCart)
//  cart page
router.get('/cart', controller.showCart)
//  cart inc
router.post('/quantityInc/:proId', controller.quantityInc)
// cart dec
router.post('/quantityDec/:proId', controller.quantityDec)
// cart delete product
router.post('/cartRemove/:cartId', controller.cartRemover)
// all products page
router.get("/allProducts", controller.getAllProducts)
// add to wishlist
router.post('/addToWish/:proId/:quantity', controller.addToWish)
//  shbow wishlist
router.get('/wishlist', controller.showWish)
// remove from wishlist
router.post('/wishRemove/:wishId', controller.wishRemover)
// add to cart from wishlist
router.post('/wishCart/:proId', controller.wishCart)
//  to check out page 
router.get('/checkout/:cartId', controller.showCheckout)
// to payment
router.post('/payment', controller.toPayment)
// myoders page
router.get('/myoders', controller.getMyOders)
// cancel order
router.post('/orderRemove/:odrId', controller.cancelOrder)
// for order confirmed
router.get('/orderConfirmed', controller.orderConfirm)
//for razor pay
router.post('/verify-payment', controller.verifyPayment)
// fill form
router.post('/fillForm/:addrsId', controller.fillForm)
//  delete address
router.post('/delete-address/:addrsId', controller.deleteAddress)
// checking coupon
router.post('/checkCoupon/:code', controller.checkCoupon)


//route exporting
module.exports = router