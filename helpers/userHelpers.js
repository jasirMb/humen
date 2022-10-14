let db = require('../config/connection')
const userCollection = require('../schema/userSchema')

const bcrypt = require('bcrypt')
const { response } = require('express')
module.exports = {
    addSignup : (userData) =>{
        return new Promise(async(res,rej) =>{
            userData.Password = await bcrypt.hash(userData.Password,10)
            let response = {}
            const user = new userCollection
            ({
                userName : userData.userName,
                userEmail : userData.userEmail,
                phoneNo : userData.phoneNo,
                Password : userData.Password
            })
            user.save().then((data) =>{
                console.log(data)
                response.user = data
                response.status = true
                res(response)
            })
        })
    },
    addLogin : (userData) =>{
        return new Promise(async(res,rej) => {
      let  user = await userCollection.findOne(({userEmail:userData.userEmail}))
      console.log(user);
      let loginStatus = false
      let response = {}
      if(user){
        bcrypt.compare(userData.Password,user.Password).then((status) =>{
            console.log("data is==========="+status);
           
            response.status = true
            
            if(status){
                console.log("login doneeee");
                response.user = user
                response.status = true
                res(response)
            }else{
                console.log("login faiuled......");
                
                res({status : false})
            }
        })
      }else{
        console.log("user not in");
        response.status = false
        res({status : false})

      }
        })
    }
}