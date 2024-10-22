import productModel from '../models/product.model.js'

export default class ProductDB {
    /**  
     * Crea un nuevo producto
     * **/
    createProduct = async(product)=>{
        try {
            const newProduct = await productModel.create(product);
            return newProduct
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
    /**  
     * Obtiene el producto especificado
     * **/
    getProductById = async(pid)=>{
        try {
            const product = await productModel.findById(pid);
            return product
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
    /**  
     * Obtiene los productos de la BD
     * **/
    getProducts = async(limit)=>{
        try {
            const products = await productModel.find();
            if (limit)
                products.limit(limit)
            return products
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
    /**  
     * Actualiza e producto especificado
     * **/
    updateProduct = async(pid, product)=>{
        try {
            const updateProduct = await productModel.findOne({ _id: pid}, { $set: product});
            if (updateProduct)
                return await productModel.findById(pid)
            return null
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
    /**  
     * Actualiza el stock del producto especificado
     * **/
    manageStockProduct = async(pid, quantity, add, reduce)=>{
        try {
            let stock = 0
            let product = await productModel.findById(pid)
            if (product) {
                stock = product.stock
                if (add === true && reduce === false) stock = product.stock + quantity
                else if (add === false && reduce === true) {
                    //Validando Stock
                    if (quantity <= product.stock)
                        stock = product.stock - quantity
                }
            } else return null
            //Actualizando el stock
            const updateProduct = await productModel.findByIdAndUpdate(
                pid, 
                { stock: stock},
                { new: true }
            )
            if (updateProduct)
                return updateProduct
            return null
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
    /**  
     * Elimina el producto especificado
     * **/
    deleteProduct = async(pid)=>{
        try {
            const product = await productModel.findById(pid)
            if (product){
                let result = await product.deleteOne({ _id: pid })
                return result
            }
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
}