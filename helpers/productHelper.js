const { adminCollection } = require('../config/collection');
const productCollection = require('../schema/productSchema')




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
                productCollection.find().lean().then((data)=>{
                    resolve(data)
                })
              
               
            })
    },
    getProductDetails : (proId)=>{
        return new Promise((resolve,reject)=>{
          productCollection.findOne({_id:(proId)}).then((product)=>{
                resolve(product)
            })
        })
    }
    
}