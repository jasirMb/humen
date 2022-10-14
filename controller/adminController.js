const { response } = require("../app");
const userHelpers = require("../helpers/userHelpers");
const productHelpers = require('../helpers/productHelper')
const adminHelper = require('../helpers/adminHelpers')


module.exports = {

    adminLogin: (req, res) => {
        let admin = req.session.admin
        if(admin){
        res.render('admin/admin-home',{admin})
        }else{
            res.render('admin/admin-login',{admin})
        }
    },
    doLogin: (req, res) => {

        adminHelper.admLogin(req.body).then((response) => {
            console.log('admin'+response.status);
            if (response.status) {
                req.session.admin = response.admin
            req.session.loggedIn = true
        res.render('admin/admin-home', { admin: true, })
        }else{
            res.render('admin/admin-login')
        }


        })


    },
    productManager: (req, res) => {
        productHelpers.allProducts().then((products) => {

            res.render('admin/product-manage', { admin: true, products })

        })

    },
    productAdd: (req, res) => {
        res.render('admin/add-product', { admin: true })
    },
    productAdder: (req, res) => {
        console.log(req.body);
        productHelpers.addProduct(req.body)
        let image = req.files.Image
        image.mv('./public/product-images/' + req.body.Name + '.jpg', (err, done) => {
            if (!err) {
                console.log("image failed" + err);
            }


            res.redirect('product-manage')



        })







    },
    productEdit: async (req, res) => {
        
            console.log(req.params.id);
            let product = await productHelpers.getProductDetails(req.params.id)
            console.log(product.Name);

            res.render('admin/edit-product', { admin: true, product })
        }
        

}