import cartsModel from '../models/cart.model.js'
import userModel from '../models/user.model.js'

export default class CartDB {
    /**  
     * Deberá de traer solo el carrito con el ID de Usuario especificado
     * **/
    getUserCart = async(uid)=>{
        try {
            const userCart = await userModel.findOne({ _id: uid })
            if (userCart) {
                const cart = await cartsModel.findOne({ _id: userCart.cart })
                if (cart) 
                    return cart
            }
        }
        catch (error){
            console.log(error)
            return null
        }
    }
    /**  
     * Deberá de traer solo el carrito con el ID del mismo especificado
     * **/
    getCartById = async(cid)=>{
        try {
            const cart = await cartsModel.findOne({ _id: cid })
            return cart
        }
        catch (error){
            console.log(error)
            return null
        }
    }
    /**  
     * Crea el carrito del usuario
     * **/
    createUserCart = async(user)=>{
        try {
            let result = await cartsModel.create({ user: user, products: []})
            return result
        }
        catch (error){
            console.log(error)
            return null
        }
    }
    /**  
     * Actualiza los productos del carrito especificado
     * **/
    putProductsInCart = async(cid, products)=>{
        try {
            const cart = await cartsModel.findOne({ _id: cid })
            if (cart) {
                cart.products = products
                let result = await cart.save()
                return result
            }
        }
        catch (error){
            console.log(error)
            return null
        }
    }
    /**  
     * Actualiza la cantidad de un producto del carrito especificado
     * **/
    putQuantityProductsInCart = async(cid, pid, quantity)=>{
        try {
            const cart = await cartsModel.findOne({ _id: cid })
            if (cart) {
                let prod_idx = cart.products.findIndex(p=> p.product.toString() === pid)
                if (prod_idx != -1){
                    cart.products[prod_idx].quantity = quantity
                    let result = await cart.save()
                    return result
                }
                else if (prod_idx == -1) {
                    const newProd = {
                        product :  pid,
                        quantity : quantity
                    }
                    cart.products.push(newProd)
                    let result = await cart.save()
                    return result
                }
            }
        }
        catch (error){
            console.log(error)
            return null
        }
    }
    /**  
     * Elimina los productos del carrito especificado
     * **/
    deleteCartProducts = async(cid)=>{
        try {
            const cart = await cartsModel.findOne({ _id: cid })
            if (cart) {
                cart.products = []
                let result = await cart.save()
                return result
            }
        }
        catch (error){
            console.log(error)
            return null
        }
    }
    /**  
     * Elimina los productos del carrito especificado
     * **/
    deleteCartProduct = async(cid, pid)=>{
        try {
            const cart = await cartsModel.findOne({ _id: cid })
            if (cart) {
                const prod_idx = cart.products.findIndex(p=> p.product.toString() === pid)
                if (prod_idx != -1) {
                    cart.products.splice(prod_idx, 1)
                    let result = await cart.save()
                    return result
                }
            }
        }
        catch (error){
            console.log(error)
            return null
        }
    }
}