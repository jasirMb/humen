const adminCollection = require('../models/adminSchema')
const bcrypt = require('bcrypt')
const { response } = require('express')
const { defaultConfiguration } = require('../app')
module.exports = {

    admLogin: (adminData) => {

        return new Promise(async (resolve, reject) => {
            let response = {}
            let admin = await adminCollection.findOne(({ adminEmail: adminData.adminEmail }))
            console.log(adminData.adminEmail);
            console.log(admin);

            if (admin) {
                bcrypt.compare(adminData.Password, admin.Password).then((pass) => {
                    console.log(pass)
                    if (pass) {
                        console.log("login success");
                        response.admin = admin
                        response.status = true
                        resolve(response)


                    } else {
                        console.log("login failed") 

                        resolve({ status: false })
                    }
                })


            } else {

                resolve({ status: false })

                console.log('no account');
            }
        })
    }


}
