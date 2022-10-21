const { Router } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../controller/adminController')
const upload = require('../multer')











//admin login page
router.get('/',controller.adminLogin)



//admin login
router.post('/admin-home',controller.doLogin)

// product management
router.get('/product-manage',controller.productManager)

//add product page
router.get('/add-product',controller.productAdd)

// addproduct 

router.post('/add-product',upload.array('productImage',3),controller.productAdder)

//  edit product page

router.get('/edit-product/:id',controller.productEdit)

//  edit product
router.post('/edited-product/:id',upload.array('productImage',3),controller.productEditor)

// user management page
router.get('/user-manage',controller.showUser)

// category manage page

router.get('/category-manage',controller.getCategory)

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
router.get('/single-category/:category',controller.singleCategory)
// product delete
router.post('/delete-product/:id',controller.deleteProduct)

module.exports = router 