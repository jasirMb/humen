let db = require('../config/connection')
const userCollection = require('../models/userSchema')

const bcrypt = require('bcrypt')
const { response } = require('express')
module.exports = {
    
        
    
     addLogin : (userData) =>{
        return new Promise(async(res,rej) => {
      let  user = await userCollection.findOne(({userEmail:userData.userEmail}))
      console.log(user);
      let loginStatus = false
      let response = {}
      if(user){
        if(user.Status){
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
          response.blocked = false
          res(response)
        }
        
      }else{
        console.log("user not in");
        response.status = false
       
        res({status : false})

      }
        })
    },


    allUsers:() =>{
      return new Promise(async (resolve, reject) => {
        await userCollection.find().lean().then((users)=>{
             resolve(users)
         })
       
        
     })
    }
}