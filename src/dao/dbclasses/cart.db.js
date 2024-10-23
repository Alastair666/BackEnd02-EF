import userModel from '../models/user.model.js'
import cartModel from '../models/cart.model.js'
import productModel from '../models/product.model.js'
import ticketModel from '../models/ticket.model.js'

export default class CartDB {
    /**  
     * Deberá de traer solo el carrito con el ID de Usuario especificado
     * **/
    getUserCart = async(uid)=>{
        try {
            const userCart = await userModel.findById(uid)
            //console.log(userCart)
            if (userCart) {
                const cart = await cartModel.findById(userCart.cart)
                //console.log(cart)
                if (cart) 
                    return cart
                else throw new Error("Can't find the user-cart by ID:"+userCart.cart)
            }
            else throw new Error("Can't find the user by ID:"+uid)
        }
        catch (error){
            console.log(error)
            throw new Error('Error get User Cart: ' + error.message)
        }
    }
    /**  
     * Deberá de traer solo el carrito con el ID del mismo especificado
     * **/
    getCartById = async(cid)=>{
        try {
            const cart = await cartModel.findById(cid)
            if (cart)
                return cart
            else throw new Error("Can't find the cart by ID:"+cid)
        }
        catch (error){
            console.log(error)
            throw new Error('Error get Cart: ' + error.message)
        }
    }
    /**  
     * Crea el carrito del usuario
     * **/
    createUserCart = async(user)=>{
        try {
            let result = await cartModel.create({ user: user, products: []})
            if (result)
                return result
            else throw new Error("Can't create the cart by user:"+user.email)
        }
        catch (error){
            console.log(error)
            throw new Error('Error create Cart: ' + error.message)
        }
    }
    /**  
     * Actualiza los productos del carrito especificado
     * **/
    putProductsInCart = async(cid, products)=>{
        try {
            console.log(`Cart ID: ${cid}`)
            const cart = await cartModel.findById(cid)
            if (cart) {
                cart.products = products
                let result = await cart.save()
                if (result)
                    return result
                else throw new Error("Can't update the products of the cart by ID:"+cid)
            }
            else throw new Error("Can't find the cart by ID:"+cid)
        }
        catch (error){
            console.log(error)
            throw new Error('Error update Cart: ' + error.message)
        }
    }
    /**  
     * Actualiza la cantidad de un producto del carrito especificado
     * **/
    putQuantityProductsInCart = async(cid, pid, quantity)=>{
        try {
            const cart = await cartModel.findOne({ _id: cid })
            if (cart) {
                //Obteniendo Producto
                let product = await productModel.findById(pid)
                if (product) {
                    //Validando Cantidad en Stock
                    console.log(`Product:\nStock BD=${product.stock}\nQuantity=${quantity}`)
                    if (product.stock >= quantity) {
                        let prod_idx = cart.products.findIndex(p=> p.product.toString() === pid)
                        if (prod_idx != -1)
                            cart.products[prod_idx].quantity = quantity
                        else if (prod_idx == -1) {
                            const newProd = {
                                product :  pid,
                                quantity : quantity
                            }
                            cart.products.push(newProd)
                        }
                        else throw new Error("Can't find the product's cart")
                        //Guardando Cambios
                        let result = await cart.save()
                        return result
                    }
                    else throw new Error("The available quantity of the product inventory cannot supply the cart order")
                }
                else throw new Error("Can't find the cart by ID:"+cid)
            }
            else throw new Error("Can't find the cart by ID:"+cid)
        }
        catch (error){
            console.log(error)
            throw new Error('Error update Cart: ' + error.message)
        }
    }
    /**  
     * Elimina los productos del carrito especificado
     * **/
    deleteCartProducts = async(cid)=>{
        try {
            const cart = await cartModel.findOne({ _id: cid })
            if (cart) {
                cart.products = []
                let result = await cart.save()
                return result
            }
            else throw new Error("Can't find the cart by ID:"+cid)
        }
        catch (error){
            console.log(error)
            throw new Error('Error delete Cart: ' + error.message)
        }
    }
    /**  
     * Elimina los productos del carrito especificado
     * **/
    deleteCartProduct = async(cid, pid)=>{
        try {
            const cart = await cartModel.findOne({ _id: cid })
            if (cart) {
                const prod_idx = cart.products.findIndex(p=> p.product.toString() === pid)
                if (prod_idx != -1) {
                    cart.products.splice(prod_idx, 1)
                    let result = await cart.save()
                    return result
                }
                else throw new Error(`Can't find the product by ID: ${pid} in the cart by ID: ${cid}`)
            }
            else throw new Error("Can't find the cart by ID:"+cid)
        }
        catch (error){
            console.log(error)
            throw new Error("Error delete Product's Cart: " + error.message)
        }
    }
    /**  
     * Crea el registro de compra en base a los productos del carrito
     * **/
    purchaseCart  = async(cid)=>{
        try {
            let result = false
            const products = []
            const cart = await cartModel.findOne({ _id: cid })
            if (cart) {
                for (const product of cart.products) {
                    let prod = await productsModel.findById(product.pid)
                    if (prod) {
                        if (prod.stock >= product.quantity)
                            products.push({ p: prod, c: product })
                    }
                    else throw new Error("Can't find the product by ID:"+product.pid)
                }
            }
            else throw new Error("Can't find the cart by ID:"+cid)

            //Validando si hay productos disponibles
            console.log(products)
            if (products.length > 0){
                //
            }
        }
        catch (error) {
            console.log(error)
            throw new Error("Error Purchase Cart: " + error.message)
        }
    }
}