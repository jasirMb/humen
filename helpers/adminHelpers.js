const adminCollection = require('../models/adminSchema')
const { response } = require('express')
module.exports = {

    admLogin: (adminData) => {
        
        return new Promise(async (resolve, reject) => {
           let response = {}
            let admin = await adminCollection.findOne(({ adminEmail: adminData.adminEmail }))
            console.log(adminData.adminEmail);
            console.log(admin);
            
            if (admin) {

                if (adminData.Password == admin.Password) {
                    console.log("login success");
                    response.admin = admin
                    response.status = true
                    resolve(response)
                    
                   
                } else {
                    console.log("login failed")
                   
                    resolve({status:false})
                }

            } else {
                
                resolve({status : false})
                
                console.log('no account');
            }
        })
    }


}
