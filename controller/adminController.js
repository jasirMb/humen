const { response } = require("../app");
const userHelpers = require("../helpers/userHelpers");
const productHelpers = require('../helpers/productHelper')
const adminHelper = require('../helpers/adminHelpers')
const userCollection = require('../models/userSchema')
const productCollection = require('../models/productSchema')
const categoryCollection = require('../models/categorySchema')
const orderSchema = require('../models/oderSchema')
const bannerSchema = require('../models/bannerSchema')
const couponSchema = require('../models/couponSchema')



module.exports = {

    adminLogin: async (req, res, next) => {
        // try {
            let admin = req.session.admin
            if (req.session.adminLoggedIn) {
                let orders = await orderSchema.find()
                let totalOrder = orders.length
                let users = await userCollection.find()
                let totalUser = users.length

                let totalSale = 0;
                for (let i = 0; i < orders.length; i++) {
                    totalSale += orders[i].total;
                }
                // graph.................................................................................
                //   for firstone

                const cancelOrder = await orderSchema.find({ status: "Canceled" }).count()
                const successOrder = totalOrder - cancelOrder
                // console.log(cancelOrder);
                // console.log(successOrder);
                // second graph
                const Pending = await orderSchema.find({ status: "Pending" }).count()
                const placed = await orderSchema.find({ status: "Placed" }).count()
                const shipped = await orderSchema.find({ status: "Shipped" }).count()
                const Delivered = await orderSchema.find({ status: "Delivered" }).count()
                    console.log(cancelOrder);
                    //sales perday graph
        const totalSales = await orderSchema.aggregate([

            // First Stage
            {
                $match: { "date": { $ne: null } }
            },
            // Second Stage
            {
                $group: {
                    _id:   "$date"  ,
                    sales: { $sum: "$total" },
                    count: { $sum: 1 },
                }
            },
            // Third Stage
            {
                $sort: { _id: 1 }
            },
            {
                $limit: 7
            }
        ])
        console.log('masood llll')
        console.log(totalSales);
        const salesLabels = totalSales.map(item => {
            return item._id
          })
          const salesData =totalSales.map(item => {
            return item.sales.toFixed(2)
          })
          
          console.log('gii')
          console.log(salesLabels);
        // console.log(salesData);
        totalSale.profit = 0 ;
        for (let i = 0; i < totalSales.length; i++) {
            totalSales[i].profit = Number(totalSales[i].sales) * 15 / 100
            
            totalSales[i].profit = Math.trunc(totalSales[i].profit)
            
        }
        console.log(totalSales);       
                res.render('admin/admin-home', { admin: true, totalOrder, totalUser, totalSale,cancelOrder,successOrder,Pending,placed,shipped,Delivered,salesLabels,salesData,totalSales})
            } else {

                res.render('admin/admin-login', { admin })
                req.session.loginerr = false

            }
        // } catch (error) {
        //     next(err)
        // }

    },
    doLogin: async (req, res, next) => {
        try {
            adminHelper.admLogin(req.body).then(async (response) => {
                // console.log('admin' + response.status);
                if (response.status) {
                    req.session.admin = response.admin
                    req.session.adminLoggedIn = true


                    res.redirect('/admin')
                } else {
                    req.session.loginerr = true
                    res.render('admin/admin-login', { "loginerr": req.session.loginerr })
                    req.session.loginerr = false
                }
            })
        } catch (error) {
            next(err)
        }
    },
    productManager: (req, res, next) => {
        try {
            // if (req.session.adminLoggedIn) {

                productHelpers.allProducts().then((products) => {

                    res.render('admin/product-manage', { admin: true, products })
                })
            // } else {
            //     res.redirect('/admin')
            // }
        } catch (error) {
            next(err)
        }
    },
    productAdd: async (req, res, next) => {
        try {
            // if (req.session.adminLoggedIn) {
                let categorys = await categoryCollection.find().lean()
                // console.log(categorys);
                res.render('admin/add-product', { admin: true, categorys })
            // } else {
            //     res.redirect('/admin')
            // }
        } catch (error) {
            next(err)
        }
    },
    productAdder: (req, res, next) => {
        try {
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
                    image: imageName,
                    Description: req.body.Description
                })
            // console.log(product);
            product.save()

            res.redirect('product-manage')
        } catch (error) {
            next(err)
        }
    },
    productEdit: async (req, res, next) => {
        try {
            // if (req.session.adminLoggedIn) {
                // console.log(req.params.id);
                let categorys = await categoryCollection.find().lean()
                let products = await productHelpers.getProductDetails(req.params.id)
                res.render('admin/edit-product', { admin: true, products, categorys })
            // } else {
            //     res.redirect('/admin')
            // }
        } catch (error) {
            next(err)
        }
    },
    productEditor: async (req, res, next) => {
        try {
            // console.log(req.body);
            proId = req.params.id
            const product = await productCollection.findOne({ _id: (proId) })
            product.Name = req.body.Name
            product.Brand = req.body.Brand
            product.Quantity = req.body.Quantity
            product.Category = req.body.Category
            product.Price = req.body.Price
            product.Description = req.body.Description
            product.archive = false
            await product.save()
            res.redirect('/admin/product-manage')
            if (req.files.Image) {
                let image = req.files.Image
                let id = req.params.id
                image.mv('./public/product-images/' + product._id + '.jpg')
            }
        } catch (error) {
            next(err)
        }
    },
    getCategory: async (req, res, next) => {
        try {
            // if (req.session.adminLoggedIn) {
                let categorys = await categoryCollection.find().lean()
                // console.log("checkout  " + req.session.nonEmptyCategory);

                res.render('admin/category-manage', { admin: true, categorys, "categoryErr": req.session.categoryErr })
                req.session.categoryErr = false


            // } else {
            //     res.redirect('/admin')
            // }
        } catch (error) {
            next(err)
        }
    },
    showUser: (req, res, next) => {
        try {
            // if (req.session.adminLoggedIn) {
                userHelpers.allUsers().then((users) => {
                    res.render('admin/user-manage', { admin: true, users })
                })
            // } else {
            //     res.redirect('/admin')
            // }
        } catch (error) {
            next(err)
        }
    },
    blockUser: async (req, res, next) => {
        try {
            let userId = req.params.id
            let user = await userCollection.findById(userId)
            user.Status = false
            await user.save()
            res.redirect('/admin/user-manage')
        } catch (error) {
            next(err)
        }
    },
    unBlockUser: async (req, res, next) => {
        try {
            let userId = req.params.id
            let user = await userCollection.findById(userId)
            user.Status = true
            await user.save()
            res.redirect('/admin/user-manage')
        } catch (error) {
            next(err)
        }
    },
    admLogout: (req, res, next) => {
        try {
            req.session.admin = null
            req.session.adminLoggedIn = false
            res.redirect('/admin')
        } catch (error) {
            next(err)
        }
    },
    addCategory: async (req, res, next) => {
        try {
            const category = req.body.category.toUpperCase()
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
        } catch (error) {
            next(err)
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            const categoryId = req.params.id
            // checking if category as some product inside
            const categoryList = await categoryCollection.findById(categoryId)
            const categoryProducts = await productCollection.find({ Category: categoryList.category })
            console.log(categoryProducts.length);
            if (categoryProducts.length == 0) {
                await categoryCollection.findByIdAndRemove(categoryId)
                res.json({ status: true })
                // res.redirect('/admin/category-manage')
            } else {
                // req.session.nonEmptyCategory = true
                console.log("hey");
                res.json({ status: false })

            }
        } catch (error) {
            next(err)
        }
    },
    singleCategory: async (req, res, next) => {
        try {
            // if (req.session.adminLoggedIn) {
                checkcate = req.params.category
                console.log(checkcate);
                let selectedProducts = await productCollection.find({ Category: checkcate }).lean()
                console.log(selectedProducts);
                res.render('admin/single-category', { selectedProducts, checkcate })
            // } else {
            //     req.session.nonEmptyCategory = true
            //     res.redirect('/admin/category-manage')
            // }
        } catch (error) {
            next(err)
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const productId = req.params.id
            let products = await productCollection.findById(productId)
            products.archive = true
            products.save()
            res.json({ status: true })
        } catch (error) {
            next(err)
        }
    },
    unhideProduct: async (req, res, next) => {
        try {
            console.log("its undo");
            const productId = req.params.id
            let products = await productCollection.findById(productId)
            products.archive = false
            products.save()
            res.json({ status: true })
        } catch (error) {
            next(err)
        }
    },
    getOrders: async (req, res, next) => {
        try {
            let userOrders = await orderSchema.find().lean()
            console.log(userOrders[0].products);
            res.render('admin/order-manage', { admin: true, userOrders })
        } catch (error) {
            next(err)
        }
    },
    singleOrder: async (req, res, next) => {
        try {
            // console.log("heyyyyyyyyyyyyy");
            let odrId = req.params.odrId
            console.log(odrId + "heyy");
            let orderList = await orderSchema.findOne({ _id: odrId }).lean()
            console.log(orderList + "heyyyyyyyyy");
            let orderProducts = orderList.products
            let orderAddress = orderList.deliveryAddress
            res.render('admin/singleOrder', { admin: true, orderList, orderProducts, orderAddress })
        } catch (error) {
            next(err)
        }
    },
    updateStatus: async (req, res, next) => {
        try {
            let newStatus = req.body.status
            let odrId = req.params.odrId
            console.log(newStatus);
            await orderSchema.findByIdAndUpdate(odrId, { status: newStatus }).lean()
            res.redirect('/admin/order-management')
        } catch (error) {
            next(err)
        }
    },
    getBanner: async (req, res, next) => {
        try {
            let banner = await bannerSchema.find().lean()
            console.log(banner);
            res.render('admin/Banner-management', { admin: true, banner })
        } catch (error) {
            next(err)
        }
    },
    addBanner: (req, res, next) => {
        try {
            const imageName = [];

            for (file of req.files) {
                imageName.push(file.filename);
            }
            console.log(imageName);
            const banner = new bannerSchema({

                name: req.body.banner,
                image: imageName,
                access: true,

            })
            console.log(banner)
            banner.save()
            res.redirect('/admin/Banner-management')
        } catch (error) {
            next(err)
        }
    },
    hideBanner: async (req, res, next) => {
        try {
            let bannerId = req.params.id
            console.log(bannerId);
            await bannerSchema.findByIdAndUpdate(bannerId, { access: false })
            res.json({ status: true })
        } catch (error) {
            next(err)
        }
    },
    unhideBanner: async (req, res, next) => {
        try {
            let bannerId = req.params.id
            console.log(bannerId);
            await bannerSchema.findByIdAndUpdate(bannerId, { access: true })
            res.json({ status: true })
        } catch (error) {
            next(err)
        }
    },
    getCoupon: async (req, res, next) => {
        try {
            let coupons = await couponSchema.find().lean()
            console.log(coupons);
            res.render('admin/coupon-manage', { admin: true, coupons })
        } catch (error) {
            next(err)
        }
    },
    addCoupon: (req, res, next) => {
        try {
            let { name, couponCode, discount, expDate } = req.body
            const coupon = new couponSchema({

                name,
                couponCode,
                discount,
                expDate,
                isActive: true,

            })
            coupon.save()
            res.redirect('/admin/coupon-management')
        } catch (error) {
            next(err)
        }

    }





}
