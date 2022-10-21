const { adminCollection } = require('../config/collection');
const productCollection = require('../models/productSchema')




module.exports = {

    addProduct : (productData) =>{
        console.log(productData);
    
            const product = new productCollection
            ({
                Name : productData.Name,
                Brand : productData.Brand,
                Quantity : productData.Quantity,
                Category : productData.Category,
                Price : productData.Price
            })
            product.save()
            
               
        
        

    },
    allProducts : () =>{
            return new Promise(async (resolve, reject) => {
               await productCollection.find().lean().then((data)=>{
                    resolve(data)
                })
              
               
            })
    },
    getProductDetails : (proId)=>{
        return new Promise(async(resolve,reject)=>{
          await productCollection.findOne({_id:(proId)}).lean().then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct : (proId,productData) => {
                console.log(proId,productData);
    }

    
    
}