const { Router } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../controller/adminController')











//admin login page
router.get('/',controller.adminLogin)



//admin login
router.post('/admin-home',controller.doLogin)

// product management
router.get('/product-manage',controller.productManager)

//add product page
router.get('/add-product',controller.productAdd)

// addproduct 

router.post('/add-product',controller.productAdder)

//  edit product page

router.get('/edit-product/:id',controller.productEdit)

module.exports = router