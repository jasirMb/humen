const { response } = require("../app");
const userHelpers = require("../helpers/userHelpers");
const productHelpers = require('../helpers/productHelper')
const adminHelper = require('../helpers/adminHelpers')
const userCollection = require('../models/userSchema')
const productCollection = require('../models/productSchema')
const categoryCollection = require('../models/categorySchema')



module.exports = {

    adminLogin: (req, res) => {
        let admin = req.session.admin
        if (req.session.adminLoggedIn) {
            res.render('admin/admin-home', { admin })
        } else {

            res.render('admin/admin-login', { admin })
            req.session.loginerr = false

        }
    },
    doLogin: (req, res) => {

        adminHelper.admLogin(req.body).then((response) => {
            // console.log('admin' + response.status);
            if (response.status) {
                req.session.admin = response.admin
                req.session.adminLoggedIn = true
                res.render('admin/admin-home', { admin: true, })
            } else {
                req.session.loginerr = true
                res.render('admin/admin-login', { "loginerr": req.session.loginerr })
                req.session.loginerr = false
            }
        })
    },
    productManager: (req, res) => {
        if (req.session.adminLoggedIn) {

            productHelpers.allProducts().then((products) => {

                res.render('admin/product-manage', { admin: true, products })
            })
        } else {
            res.redirect('/admin')
        }

    },
    productAdd: async (req, res) => {
        if (req.session.adminLoggedIn) {
            let categorys = await categoryCollection.find().lean()
            // console.log(categorys);
            res.render('admin/add-product', { admin: true, categorys })
        } else {
            res.redirect('/admin')
        }

    },
    productAdder: (req, res) => {
        // console.log(req.body);
        const imageName = [];
        console.log(req.files.filename)
        console.log(req.body);
        for (file of req.files) {
            imageName.push(file.filename);
        }
        const product = new productCollection
            ({
                Name: req.body.Name,
                Brand: req.body.Brand,
                Quantity: req.body.Quantity,
                Category: req.body.Category,
                Price: req.body.Price,
                archive: false,
                image: imageName
            })
        // console.log(product);
        product.save()

        res.redirect('product-manage')

    },
    productEdit: async (req, res) => {
        if (req.session.adminLoggedIn) {
            // console.log(req.params.id);
            let products = await productHelpers.getProductDetails(req.params.id)
            res.render('admin/edit-product', { admin: true, products })
        } else {
            res.redirect('/admin')
        }

    },
    productEditor: async (req, res) => {
        // console.log(req.body);
        proId = req.params.id
        const product = await productCollection.findOne({ _id: (proId) })
        product.Name = req.body.Name
        product.Brand = req.body.Brand
        product.Quantity = req.body.Quantity
        product.Category = req.body.Category
        product.Price = req.body.Price
        product.archive = false
        await product.save()
        res.redirect('/admin/product-manage')
        if (req.files.Image) {
            let image = req.files.Image
            let id = req.params.id
            image.mv('./public/product-images/' + product._id + '.jpg')
        }
    },
    getCategory: async (req, res) => {
        if (req.session.adminLoggedIn) {
            let categorys = await categoryCollection.find().lean()
            console.log("checkout  " + req.session.nonEmptyCategory);
            res.render('admin/category-manage', { admin: true, categorys, "categoryErr": req.session.categoryErr, "nonEmpty": req.session.nonEmptyCategory })
            req.session.categoryErr = false
        } else {
            res.redirect('/admin')
        }

    },
    showUser: (req, res) => {
        if (req.session.adminLoggedIn) {
            userHelpers.allUsers().then((users) => {
                res.render('admin/user-manage', { admin: true, users })
            })
        } else {
            res.redirect('/admin')
        }

    },
    blockUser: async (req, res) => {
        let userId = req.params.id
        let user = await userCollection.findById(userId)
        user.Status = false
        await user.save()
        res.redirect('/admin/user-manage')
    },
    unBlockUser: async (req, res) => {
        let userId = req.params.id
        let user = await userCollection.findById(userId)
        user.Status = true
        await user.save()
        res.redirect('/admin/user-manage')
    },
    admLogout: (req, res) => {
        req.session.admin = null
        req.session.adminLoggedIn = false
        res.redirect('/admin')
    },
    addCategory: async (req, res) => {
        const { category } = req.body;
        const data = await categoryCollection.findOne({ category: (category) })
        if (data == null) {
            const addedCategory = new categoryCollection
                ({
                    category
                })
            addedCategory.save()
            res.redirect("/admin/category-manage")
        } else {
            req.session.categoryErr = true
            res.redirect("/admin/category-manage")
        }

    },
    deleteCategory: async (req, res) => {
        const categoryId = req.params.id
        // checking if category as some product inside
        const categoryList = await categoryCollection.findById(categoryId)
        const categoryProducts = await productCollection.find({ Category: categoryList.category })
        console.log(categoryProducts.length);
        if (categoryProducts.length == 0) {
            await categoryCollection.findByIdAndRemove(categoryId)
            res.redirect('/admin/category-manage')
        } else {
            req.session.nonEmptyCategory = true
            res.redirect('/admin/category-manage')
        }


    },
    singleCategory: async (req, res) => {
        if (req.session.adminLoggedIn) {
            checkcate = req.params.category
            console.log(checkcate);
            let selectedProducts = await productCollection.find({ Category: checkcate }).lean()
            console.log(selectedProducts);
            res.render('admin/single-category', { selectedProducts, checkcate })
        } else {
            req.session.nonEmptyCategory = true
            res.redirect('/admin/category-manage')
        }

    },
    deleteProduct: async (req, res) => {
        const productId = req.params.id
        let products = await productCollection.findById(productId)
        products.archive = true
        products.save()
        res.json({ status: true })
    }




}
