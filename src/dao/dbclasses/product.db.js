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
            return updateProduct
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