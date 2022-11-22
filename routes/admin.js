const { Router } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../controller/adminController')
const upload = require('../multer')
const session =  require('../adminSession')










//admin login page
router.get('/',controller.adminLogin)
//signup



//admin login
router.post('/admin-home',controller.doLogin)

// product management
router.get('/product-manage',session,controller.productManager)

//add product page
router.get('/add-product',session,controller.productAdd)

// addproduct 

router.post('/add-product',upload.array('productImage',3),controller.productAdder)

//  edit product page

router.get('/edit-product/:id',session,controller.productEdit)

//  edit product
router.post('/edited-product/:id',upload.array('productImage',3),controller.productEditor)

// user management page
router.get('/user-manage',session,controller.showUser)

// category manage page

router.get('/category-manage',session,controller.getCategory)

// block user

router.get('/block-user/:id',controller.blockUser)

// unblock user

router.get('/unBlock-user/:id',controller.unBlockUser)

//logout

router.get('/admlogout',controller.admLogout)

// add category
router.post('/add-category',controller.addCategory)
// delete category
router.post('/delete-category/:id',controller.deleteCategory)

// single category  page
router.get('/single-category/:category',session,controller.singleCategory)
// product delete
router.post('/delete-product/:id',controller.deleteProduct)
// undo delete
router.post('/undoDelete-product/:id',controller.unhideProduct)
// order managemnet
router.get('/order-management',session,controller.getOrders)
// single order details
router.get('/singleOrder/:odrId',session,controller.singleOrder)
// update status
router.post('/update-status/:odrId',controller.updateStatus)
// view banner mangement
router.get('/banner-management',session,controller.getBanner)
//  add banner
router.post('/add-banner',upload.array('bannerImage',3),controller.addBanner)
// hide banner
router.post('/hide-banner/:id',controller.hideBanner)
// unhide banner
router.post('/unhide-banner/:id',controller.unhideBanner)
//  coupen page
router.get('/coupon-management',session,controller.getCoupon)
// add coupon
router.post('/add-coupon',controller.addCoupon)
// 404 rendering
router.use(function (req, res, next) {
    next(createError(404));
  });
  
  router.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('admin/404');
  });
module.exports = router 