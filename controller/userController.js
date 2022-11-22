const { response } = require("../app");
const productCollection = require("../models/productSchema")
const productHelper = require("../helpers/productHelper");
const userHelpers = require("../helpers/userHelpers");
const userSchema = require("../models/userSchema");
const cartSchema = require("../models/cartSchema")
const categorySchema = require("../models/categorySchema")
const addressSchema = require("../models/addressSchema")
const wishSchema = require("../models/wishSchema")
const orderSchema = require("../models/oderSchema")
const bannerSchema = require("../models/bannerSchema")
const couponSchema = require('../models/couponSchema')

const bcrypt = require('bcrypt')
const otpGenerator = require('otp-generator');
const Razorpay = require('razorpay')

const accountSid = process.env.twilio_id
const authToken = process.env.twilio_token;
const client = require('twilio')(accountSid, authToken);
const instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
})



module.exports = {
    showHome: async (req, res, next) => {
        try {
            const products = await productCollection.find({ archive: false }).limit(12).lean()
            const banner = await bannerSchema.find({ access: true }).lean()
            console.log(banner);

            let user = req.session.user
            if (user) {
                let userId = req.session.user._id
                let cartItems = await cartSchema.findOne({ userId: userId }).lean().populate('products.productId').exec()
                if (cartItems) {
                    req.session.cartNum = cartItems.products.length
                }

                let wishItems = await wishSchema.findOne({ userId: userId }).lean().populate('products.productId').exec()
                if (wishItems) {
                    req.session.wishNum = wishItems.products.length
                }


            }

            // console.log(user);
            res.render('user/home', { userlog: true, products, user, "cartNum": req.session.cartNum, "wishNum": req.session.wishNum, banner })

        } catch (error) {
            next(err)
        }

    },
    showLogin: (req, res, next) => {
        try {
            if (req.session.loggedIn) {
                res.redirect('/')
            }
            else {
                res.render('user/loginpage', {
                    "signupErr": req.session.signupErr, "loginErr": req.session.loginErr,
                    "confirmPassErr": req.session.confirmpassErr, "blockedErr": req.session.blocked
                })
                req.session.signupErr = false, req.session.loginErr = false, req.session.confirmpassErr = false,
                    req.session.blocked = false
            }
        } catch (error) {
            next(err)
        }

    },
    showSignup: (req, res, next) => {
        try {
            res.render('user/signup')
        } catch (error) {
            next(err)
        }

    },
    doSignup: (req, res, next) => {
        try {
            if (req.body.Password == req.body.Password2) {
                userSchema.findOne({ userEmail: req.body.userEmail }, async (err, data) => {
                    // console.log(data == null);
                    if (data == null) {

                        let otpGen = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
                        console.log(otpGen);

                        req.session.userdata = req.body
                        req.session.userdata.otp = otpGen
                        client.messages
                            .create({
                                body: otpGen,
                                messagingServiceSid: 'MGc561e6dfb83292c170c808f2fb534508',
                                to: '+918848607194'
                            })
                            .then(message => console.log(message.sid))
                            .done();
                        res.render('user/otppage')

                    } else {
                        req.session.signupErr = true
                        res.redirect('/login')
                    }
                })
            } else {
                req.session.confirmpassErr = true
                res.redirect('/login')
            }
        } catch (error) {
            next(err)
        }


    },
    otpCompare: async (req, res, next) => {
        try {
            user = (req.session.userdata);
            generatedOtp = req.session.userdata.otp
            req.session.user = user;
            // console.log((req.body.otp));
            // console.log();
            // console.log(generatedOtp ==req.body.otp);
            if (generatedOtp == req.body.otp) {
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
                        req.session.user = newuser
                        req.session.loggedIn = true
                        res.redirect('/')
                    })
                    .catch(err => {
                        console.log('error is' + err);
                        res.redirect('/login')
                    })

                // res.render('user/home') 
            } else {
                req.session.otpErr = true
                res.render('user/otppage', { "otpErr": req.session.otpErr })
                req.session.otpErr = false
            }
        } catch (error) {
            next(err)
        }
    },
    doLogin: (req, res, next) => {
        try {
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
        } catch (error) {
            next(err)
        }
    },
    getHome: (req, res, next) => {
        try {
            res.redirect('/')
        } catch (error) {
            next(err)
        }

    },
    getLogout: (req, res, next) => {
        try {
            req.session.user = null
            req.session.loggedIn = false
            req.session.cartNum = null
            res.redirect('/')
        } catch (error) {
            next(err)
        }
    },
    showProfile: (req, res, next) => {
        try {
            let user = req.session.user
            if (user) {
                // console.log(user.userEmail);
                res.render('user/user-profile', { user })
            } else {
                res.redirect('/login')
            }
        } catch (error) {
            next(err)
        }

    },
    editProfile: (req, res, next) => {
        try {
            let user = req.session.user
            if (user) {
                console.log(user.userName);
                res.render('user/profile-edit', { user })
            } else {
                res.redirect('/login')
            }
        } catch (error) {
            next(err)
        }
    },
    singleProduct: async (req, res, next) => {
        try {
            id = req.params.id
            user = req.session.user
            const product = await productCollection.findById(id).lean()
            // console.log(product.Name);
            res.render('user/single-product', { product, user, userlog: true, user })
        } catch (error) {
            next(err)
        }

    },
    addToCart: async (req, res, next) => {
        try {
            if (req.session.user) {
                let quantity = req.params.quantity
                const userId = req.session.user._id
                // console.log(quantity+"heyyyyyyyyyyyyyyy");
                cartProductQuantity = 1;
                // console.log("heyheyhey" + userId);
                if (quantity > 0) {
                    productId = req.params.proId
                    const findProduct = await productCollection.findById(productId)
                    // console.log(findProduct);
                    const price = findProduct.Price
                    const name = findProduct.Name
                    const userCart = await cartSchema.findOne({ userId })
                    // if user already has a cart
                    if (userCart) {
                        let itemIndex = userCart.products.findIndex(p => p.productId == productId);
                        console.log(itemIndex + "indexxxxxxxx");
                        if (itemIndex > -1) {
                            //  then the product already exist
                            let productItem = userCart.products[itemIndex]
                            productItem.quantity++;
                            console.log(productItem.quantity);

                            // let qtyproduct = await cartSchema.findOneAndUpdate({
                            //     userId :userId}, {$inc : {'products.quantity' : 1}}).exec();
                            //     qtyproduct.save()

                            // res.redirect('/')
                        } else {
                            // product is not in cart
                            console.log(userCart.products);
                            userCart.products.push({
                                productId, quantity: 1,

                                name, price
                            });


                            await userCart.save()



                            // res.redirect('/')
                        }
                        userCart.total = userCart.products.reduce((acc, curr) => {
                            return acc + curr.quantity * curr.price;
                        }, 0)


                        await userCart.save()
                        res.json({ status: true })
                    } else {
                        // user has no cart
                        const newCart = new cartSchema({
                            userId: userId,
                            products: [{ productId, quantity: 1, name, price }],
                            total: cartProductQuantity * price
                        })
                        await newCart.save()
                        res.json({ status: true })
                        // res.redirect('/')
                    }
                    //      
                } else {
                    console.log("OUT OF STOCK");
                    res.json({ status: "noStock" })
                }
            } else {
                // res.redirect('/login')
                res.json({ status: "noLogg" })
            }
        } catch (error) {
            next(err)
        }
    },
    showCart: async (req, res, next) => {
        try {
            if (req.session.user) {
                const userId = req.session.user._id
                let user = req.session.user
                let cartItems = await cartSchema.findOne({ userId: userId }).lean().populate('products.productId').exec()

                //   let cartNum = req.session.cartNum
                if (cartItems) {
                    if (cartItems.products.length != 0) {
                        req.session.cartNum = cartItems.products.length
                        console.log(cartItems.products[0].productId.Name);
                        const products = cartItems.products
                        // console.log(products[0].productId+"jiiiiiiiiiii");
                        res.render('user/cart', { products, cartItems, userlog: true, user, "cartNum": req.session.cartNum })
                    } else {
                        req.session.cartNum = 0
                        console.log("itds elseeeeeeee");
                        res.render('user/empty-cart', { userlog: true, user, "cartNum": req.session.cartNum })
                    }

                } else {
                    req.session.cartNum = 0
                    console.log("itds elseeeeeeee");
                    res.render('user/empty-cart', { userlog: true, user, "cartNum": req.session.cartNum })
                }


            } else {
                res.redirect('/login')
            }
        } catch (error) {
            next(err)
        }
    },
    quantityInc: async (req, res ,next) => {
        try {
            proObj = req.params.proId
            // console.log(proObj+"incccccccccccccccccccccccc");
            let userId = (req.session.user._id)
            let product = await cartSchema.findOne({ userId })
            // console.log(product);
            let itemIndex = product.products.findIndex(p => p.productId == proObj);
            console.log(itemIndex);
            let productItem = product.products[itemIndex]
            productItem.quantity++;
            product.total = product.total + productItem.price
            product.save()
            res.json({ status: true })
        } catch (error) {
            next(err)
        }
    },
    quantityDec: async (req, res, next) => {
        try {
            proObj = req.params.proId
            console.log(proObj + "inc not");
            let userId = (req.session.user._id)
            let product = await cartSchema.findOne({ userId })
            // console.log(product);
            let itemIndex = product.products.findIndex(p => p.productId == proObj);
            console.log(itemIndex);
            let productItem = product.products[itemIndex]
            productItem.quantity--;
            product.total = product.total - productItem.price
            product.save()
            res.json({ status: true })
        } catch (error) {
            next(err)
        }
    },
    cartRemover: async (req, res, next) => {
        try {
            let proId = req.params.cartId
            if (req.session.user) {
                let user = req.session.user
                console.log(user._id);
                let product = await cartSchema.findOne({ userId: user._id })

                let itemIndex = product.products.findIndex(p => p.productId == proId);
                let reducePrice = product.products[itemIndex].quantity * product.products[itemIndex].price
                product.total = product.total - reducePrice
                product.products.splice(itemIndex, 1)
                product.save()
                res.json({ status: true })
            }
        } catch (error) {
            next(err)
        }
    },
    getAllProducts: async (req, res ,next) => {
        try {
            let products = await productCollection.find({ archive: false }).lean()
            let categorys = await categorySchema.find().lean()
            console.log(products);
            res.render("user/products", { products, userlog: true, categorys })
        } catch (error) {
            next(err)
        }
    },
    addToWish: async (req, res, next) => {
        try {
            if (req.session.user) {
                let quantity = req.params.quantity
                let productId = req.params.proId
                const userId = req.session.user._id
                console.log(quantity + "heyyyyyyyyyyyyyyy");
                cartProductQuantity = 1;
                // console.log("heyheyhey" + userId);

                const userWish = await wishSchema.findOne({ userId })
                console.log(userWish);
                if (userWish == null) {
                    // user has no wishlist
                    const newWish = new wishSchema({
                        userId: userId,
                        products: [{ productId }],
                    })
                    await newWish.save()
                } else {
                    // user has wish list
                    let itemIndex = userWish.products.findIndex(p => p.productId == productId);
                    console.log(itemIndex + "indexxxxxxxxWishhh");
                    if (itemIndex > -1) {
                        //  then the product already exist
                        userWish.products.splice(itemIndex, 1)
                        userWish.save()
                    } else {
                        // product is not in cart
                        console.log("no product");
                        userWish.products.push({ productId });
                        userWish.save()
                    }
                }
            } else {

                res.json({ status: true })
            }
        } catch (error) {
            next(err)
        }
    },
    showWish: async (req, res, next) => {
        try {
            if (req.session.user) {
                const userId = req.session.user._id
                let user = req.session.user
                let wishItems = await wishSchema.findOne({ userId: userId }).lean().populate('products.productId').exec()

                if (wishItems != null) {

                    if (wishItems.products.length != 0) {
                        req.session.wishNum = wishItems.products.length
                        // console.log(wishItems.products[0].productId.Name);
                        const products = wishItems.products
                        // console.log(products[0].productId+"jiiiiiiiiiii");
                        res.render('user/wishlist', { products, wishItems, userlog: true, user, "wishNum": req.session.wishNum })
                    } else {
                        // req.session.cartNum = 0
                        // console.log("itds elseeeeeeee");
                        res.render('user/empty-wishlist', { userlog: true, user, })
                    }

                } else {
                    res.render('user/empty-wishlist', { userlog: true, user, })
                }
            } else {
                res.redirect('/login')
            }

        } catch (error) {
            next(err)
        }
    },
    wishRemover: async (req, res, next) => {
        try {
            let proId = req.params.wishId
            if (req.session.user) {
                let user = req.session.user
                let product = await wishSchema.findOne({ userId: user._id })
                let itemIndex = product.products.findIndex(p => p.productId == proId);
                product.products.splice(itemIndex, 1)
                product.save()
                res.json({ status: true })
            }
        } catch (error) {
            next(err)
        }
    },
    wishCart: async (req, res, next) => {
        try {
            if (req.session.user) {

                const userId = req.session.user._id
                // console.log(quantity+"heyyyyyyyyyyyyyyy");
                cartProductQuantity = 1;
                // console.log("heyheyhey" + userId);
                productId = req.params.proId
                const findProduct = await productCollection.findById(productId)
                // console.log(findProduct);
                const price = findProduct.Price
                const name = findProduct.Name
                const userCart = await cartSchema.findOne({ userId })
                // if user already has a cart
                if (userCart) {
                    let itemIndex = userCart.products.findIndex(p => p.productId == productId);
                    console.log(itemIndex + "indexxxxxxxx");
                    if (itemIndex > -1) {
                        //  then the product already exist
                        let productItem = userCart.products[itemIndex]
                        productItem.quantity++;
                        console.log(productItem.quantity);

                        // let qtyproduct = await cartSchema.findOneAndUpdate({
                        //     userId :userId}, {$inc : {'products.quantity' : 1}}).exec();
                        //     qtyproduct.save()

                        // res.redirect('/')
                    } else {
                        // product is not in cart
                        console.log(userCart.products);
                        userCart.products.push({
                            productId, quantity: 1,

                            name, price
                        });


                        await userCart.save()



                        // res.redirect('/')
                    }
                    userCart.total = userCart.products.reduce((acc, curr) => {
                        return acc + curr.quantity * curr.price;
                    }, 0)


                    await userCart.save()
                    res.json({ status: true })
                } else {
                    // user has no cart
                    const newCart = new cartSchema({
                        userId: userId,
                        products: [{ productId, quantity: 1, name, price }],
                        total: cartProductQuantity * price
                    })
                    await newCart.save()
                    res.json({ status: true })
                    // res.redirect('/')
                }
                //
                console.log(productId + "workinggggggggg");
                let wishProduct = await wishSchema.findOne({ userId })
                let itemIndex = wishProduct.products.findIndex(p => p.productId == productId);
                wishProduct.products.splice(itemIndex, 1)
                wishProduct.save()
            } else {
                // res.redirect('/login')

                res.json({ status: "noLogg" })

            }
        } catch (error) {
            next(err)
        }
    },
    showCheckout: async (req, res, next) => {
        try {
            let cartId = req.params.cartId
            if (req.session.user) {
                let userId = req.session.user._id
                let allCart = await cartSchema.findOne({ userId }).lean()
                if (allCart != null) {
                    let cartProducts = allCart.products
                    // console.log(cartProducts[0].name);

                    const findAddress = await addressSchema.findOne({ userId }).lean()
                    if (findAddress != null) {
                        let newAddress = findAddress.address.slice(0, 4)
                        res.render('user/checkOut', { cartProducts, allCart, newAddress })
                    } else {
                        let newAddress = null
                        res.render('user/checkOut', { cartProducts, allCart, newAddress })
                    }
                } else {
                    res.redirect('/')
                }

                // console.log(findAddress);

            } else {
                res.redirect('/login')
            }
        } catch (error) {
            next(err)
        }
    },
    toPayment: async (req, res, next) => {
        // try {
            console.log("ajaxxxxxxxxxxxxxxxxxxxxxxxxxx");
            if (req.session.user) {
                let userId = req.session.user._id
                // console.log(userId)
                const findAddress = await addressSchema.findOne({ userId })
                if (findAddress == null) {
                    // user has no address
                    const newAddress = new addressSchema({
                        userId,
                        address: [{
                            name: req.body.name,
                            phoneNo: req.body.phoneNo,
                            address: req.body.address,
                            city: req.body.city,
                            state: req.body.state,
                            country: req.body.country,
                            zip: req.body.zip,
                            payment: req.body.payment
                        }],

                    })
                    await newAddress.save()

                } else {
                    // user dos not have a address collection
                        findAddress.address.push({
                            name: req.body.name,
                            phoneNo: req.body.phoneNo,
                            address: req.body.address,
                            city: req.body.city,
                            state: req.body.state,
                            country: req.body.country,
                            zip: req.body.zip,
                            payment: req.body.payment
                        });
                        await findAddress.save()
                }
                //adding order schema
                let cart = await cartSchema.findOne({ userId })
                // console.log(cart);
                let newDate = new Date().toJSON().slice(0, 10);
                const newOrder = new orderSchema({
                    userId,
                    deliveryAddress: [{
                        name: req.body.name,
                        phoneNo: req.body.phoneNo,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        country: req.body.country,
                        zip: req.body.zip,

                    }],
                    paymentType: req.body.payment,
                    date: newDate,
                    products: cart.products,
                    total: cart.total,
                    status : "Payment Failed"
                })


                // let products = newOder.products
                // console.log(products);
                await cart.remove()
                await newOrder.save()
                // console.log(req.body.payment + "heyyyyyyyyyy");
                // console.log(orderListed + "orderrrrrrrrr");
                req.session.orderId = newOrder._id
                if (req.body.payment == 'COD') {req.body
                    // req.session.orderId = newOrder._id

                    console.log("coooooooooooooddddddddddddd");
                    await orderSchema.findByIdAndUpdate(newOrder._id, { status: "Pending" })
                    res.json({ codStatus: true })
                } else {

                    console.log("onnnnnnnnnnnnnnnnnnnnnnn");
                    let options = {
                        amount: newOrder.total * 100,  // amount in the smallest currency unit
                        currency: "INR",
                        receipt: "" + newOrder._id
                    };
                    instance.orders.create(options, function (err, order) {
                        // console.log(order);
                        res.json(order)
                    });


                }

            } else {
                res.redirect('/')
            }
        // } catch (error) {
        //     next(err)
        // }
    },
    orderConfirm: async (req, res, next) => {
        try {
            console.log("coooooooooooooooooooooooood");
            let orderId = req.session.orderId
            // console.log(orderId + "oserrr iiid");
            let orderList = await orderSchema.findOne({ _id: orderId }).lean();

            let orderProducts = orderList.products
            let orderAddress = orderList.deliveryAddress

            // console.log(orderList.total + "heyyyyyyyyyyyyyyyy");
            res.render('user/oder-confirmed', { orderList, orderProducts, orderAddress, userlog: true, });
        } catch (error) {
            next(err)
        }
    },
    verifyPayment: async (req, res ,next) => {
        try {
            console.log("heloooooooooooooooooooooooooooooooooooooooo");
            let payment = req.body.payment
            let order = req.body.order
            console.log(payment.razorpay_order_id);
            const crypto = require('crypto')
            let hmac = crypto.createHmac('sha256', '8k6mLxEf9pmQ0VSqj1TVnqjL')
            hmac.update(payment.razorpay_order_id + '|' + payment.razorpay_payment_id)
            hmac = hmac.digest('hex')
            console.log(hmac == payment.razorpay_signature);
            if (hmac === payment.razorpay_signature) {
                console.log("payment succesdfull");
                orderId = req.session.orderId
                console.log(orderId);
                await orderSchema.findByIdAndUpdate(orderId, { status: "Placed" })
                res.json({ status: true })
            } else {
                console.log("payment failed");
                orderId = req.session.orderId
                console.log(orderId);
                await orderSchema.findByIdAndUpdate(orderId, { status: "Payment Failed" })
                res.json({ status: false })
            }
        } catch (error) {
            next(err)
        }
    },
    getMyOders: async (req, res, next) => {
        try {
            if (req.session.user) {
                let userId = req.session.user._id
                let userOrders = await orderSchema.find({ userId }).lean().populate('products.productId').exec()
                // // console.log(userOrders._id+"just idddddddddddd");
                // console.log(userOrders);
                // let products = userOrders.products
                // // console.log(userOrders);
                // let orderAddress = userOrders.deliveryAddress
                // let productsOrder = await oderSchema.find({ userId: userId }).lean().populate('products.productId').exec()
                // console.log(productsOrder[0].products[0].productId);
                // ,products,orderAddress,productsOrder
                res.render('user/myoders', { userOrders })
            } else {
                res.redirect('/')
            }
        } catch (error) {
            next(err)
        }
    },
    cancelOrder: async (req, res, next) => {
        try {
            odrId = req.params.odrId
            await orderSchema.findByIdAndUpdate(odrId, { status: "Cancel" }).lean()
            res.json({ status: true })
            // res.redirect('user/oder-confirmed')
        } catch (error) {
            next(err)
        }
    },
    fillForm: async (req, res, next) => {
        try {
            let addrsId = req.params.addrsId
            let userId = req.session.user._id
            let userAddress = await addressSchema.findOne({ userId })
            //       
            let itemIndex = userAddress.address.findIndex(p => p._id == addrsId);
            let address = userAddress.address[itemIndex]
            console.log(address);
            res.json(address)
        } catch (error) {
            next(err)
        }
    },
    deleteAddress: async (req, res, next) => {
        try {
            let addrsId = req.params.addrsId
            let userId = req.session.user._id
            let userAddress = await addressSchema.findOne({ userId })
            //       
            let itemIndex = userAddress.address.findIndex(p => p._id == addrsId);
            console.log(itemIndex);
            userAddress.address.splice(itemIndex, 1)
            userAddress.save()
            res.json({ status: true })
        } catch (error) {
            next(err)
        }
    },
    checkCoupon: async (req, res ,next) => {
        try {
            let code = req.params.code
            if (req.session.user) {
                let userId = req.session.user._id
                // checking if code is valid or not
                let coupons = await couponSchema.findOne({
                    couponCode: code,
                    isActive: true
                }).lean()
                console.log(coupons);
                if (coupons != null) {
                    console.log("there is match");
                    let today = new Date();
                    if (coupons.expDate > today) {
                        let itemIndex = coupons.usedUsers.findIndex(p => p.userId == userId);
                        console.log(itemIndex);
                        if (itemIndex == -1) {
                            let userCart = await cartSchema.findOne({ userId })
                            let discount = coupons.discount
                            let discountPrice = ((userCart.total / 100) * discount)
                            discountPrice = Math.round(discountPrice)
                            userCart.total = (userCart.total) - (discountPrice)
                            console.log(userCart.total);
                            userCart.save()
                            await couponSchema.findOneAndUpdate({ couponCode: code }, { $push: { usedUsers: { userId } } })
                            res.json({ status: true, discountPrice })
                        } else {
                            res.json({ used: true })
                            console.log("useddd");
                        }

                    } else {
                        console.log("expiredddddddddddd");
                        res.json({ expired: true })
                    }
                } else {
                    console.log("heyy itss nooo mattcchhhh");
                    res.json({ noMatch: true })
                }
            } else {
                res.redirect('/login')
            }
        } catch (error) {
            next(err)
        }

    }




}